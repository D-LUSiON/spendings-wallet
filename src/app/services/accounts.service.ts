import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account, Currency } from '../shared/classes';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {

    private _accounts: Account[] = [
        new Account({
            id: 1,
            title: 'Cash',
            initial_balance: 123.45,
            currency: new Currency({
                id: 1,
                name: 'BGN',
                sign: 'лв.'
            }),
            financial_movements: [
                {
                    id: 1,
                    amount: 20.40,
                    type: 0,
                    description: 'Cigarettes',
                    category: {
                        id: 1,
                        name: 'Cigarettes',
                        icon: 'smoking'
                    },
                    date: '2021-07-29'
                },
                {
                    id: 1,
                    amount: 800,
                    type: 1,
                    description: 'Withdraw',
                    category: {
                        id: 2,
                        name: 'Money withdraw',
                        icon: 'money'
                    },
                    date: '2021-07-30',
                    transfer_account_id: 2
                },
            ]
        }),
        new Account({
            id: 2,
            title: 'Bank account 1',
            initial_balance: 4607.33,
        }),
        new Account({
            id: 3,
            title: 'Bank account 2',
            initial_balance: 1502.87,
        }),
        new Account({
            id: 4,
            title: 'Credit card',
            initial_balance: -400,
            currency: new Currency({
                id: 1,
                name: 'USD',
                sign: '$',
                position: 1
            }),
        }),
        new Account({
            id: 5,
            title: 'PayPal',
            initial_balance: -2320.40,
            active: false
        }),
        new Account({
            id: 6,
            title: 'Savings',
            initial_balance: 1108,
        }),
    ];

    accounts$: BehaviorSubject<Account[]> = new BehaviorSubject(this.accounts);

    constructor() { }

    get accounts() {
        return [...this._accounts];
    }

    async createOrUpdateAccount(account: Account) {
        const account_idx = this._accounts.findIndex(x => x.id === account.id);
        if (account_idx > -1)
            this._accounts[account_idx] = account;
        else {
            if (!account.id)
                account.id = this._accounts.length ? this._accounts[this._accounts.length - 1].id + 1 : 1;
            this._accounts.push(account);
            this.accounts$.next(this.accounts);
        }
    }

    async removeAccount(id: number) {

    }
}
