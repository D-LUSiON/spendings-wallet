import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../shared/classes';
import { ConnectionStatus, DatabaseService } from './database.service';
import { Repository } from 'typeorm';
import { AccountEntity } from '@app/entities';
import { DB_ACCOUNTS_DEFAULT } from '@app/db_def';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {

    private _accountsRepository: Repository<AccountEntity>;

    private _accounts: Account[] = [];

    accounts$: BehaviorSubject<Account[]> = new BehaviorSubject(this.accounts);

    constructor(
        private _database: DatabaseService,
    ) {
        this._database.connected$.subscribe(async (status) => {
            if (status === ConnectionStatus.connected) {
                this._accountsRepository = _database.dataSource.getRepository(AccountEntity);
                await this._init();
            }
        });
    }

    private async _init() {
        this._accounts = await this.getAll();
        if (this._accounts.length === 0) {
            await this._insertDefaultCategories(DB_ACCOUNTS_DEFAULT);
            this._accounts = await this.getAll();
        }
        this.accounts$.next(this._accounts);
    }

    get accounts() {
        return [...this._accounts];
    }

    async getAll() {
        const entities = await this._accountsRepository.find({
            relations: [
                'entries',
                'entries.account',
                'entries.account_to',
                'entries.category',
                'entries_to',
                'entries_to.account',
                'entries_to.account_to',
                'entries_to.category',
            ]
        });
        const accounts: Account[] = [];
        entities.forEach(entity => {
            const account = new Account(entity);
            accounts.push(account);
        });
        return accounts;
    }

    private async _insertDefaultCategories(accounts: Account[]) {
        const entities = [];
        accounts.forEach(account => {
            entities.push(this._createEntity(account));
        });

        await this._accountsRepository.insert(entities);
    }

    private _createEntity(account: Account): AccountEntity {
        const accEntity = new AccountEntity();
        accEntity.id = account.id;
        accEntity.title = account.title;
        accEntity.description = account.description;
        accEntity.active = account.active;
        accEntity.initial_balance = account.initial_balance;
        return accEntity;
    }

    async createOrUpdateAccount(account: Account) {
        let accEntity = this._createEntity(account);
        accEntity = await this._accountsRepository.save(accEntity);

        account = new Account(accEntity);
        const account_idx = this._accounts.findIndex(x => x.id === account.id);
        if (account_idx > -1)
            this._accounts[account_idx] = account;
        else {
            if (!account.id)
                account.id = this._accounts.length ? this._accounts[this._accounts.length - 1].id + 1 : 1;
            this._accounts.push(account);
        }
        this.accounts$.next(this.accounts);
    }

    async removeAccount(account: Account) {
        await this._accountsRepository.delete({ id: account.id });

        this._accounts = this._accounts.filter(x => x.id !== account.id);
        this.accounts$.next(this.accounts);
    }
}
