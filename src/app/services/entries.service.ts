import { Injectable } from '@angular/core';
import { EntryEntity } from '@app/entities';
import { Entry } from '@app/shared/classes';
import { BehaviorSubject } from 'rxjs';
import { Repository } from 'typeorm';
import { ConnectionStatus, DatabaseService } from './database.service';

@Injectable({
    providedIn: 'root'
})
export class EntriesService {

    private _entriesRepository: Repository<EntryEntity>;

    private _entries: Entry[] = [];

    entries$: BehaviorSubject<Entry[]> = new BehaviorSubject(this.entries);

    constructor(
        private _database: DatabaseService,
    ) {
        this._database.connected$.subscribe(async (status) => {
            if (status === ConnectionStatus.connected) {
                this._entriesRepository = _database.dataSource.getRepository(EntryEntity);
                this._entries = await this.getAll();
                this.entries$.next(this._entries);
            }
        });
    }

    get entries() {
        return [...this._entries];
    }

    async getAll() {
        const entities = await this._entriesRepository.find({ relations: ['account', 'account_to', 'category']});
        const entries: Entry[] = [];
        entities.forEach(entity => {
            const entry = new Entry(entity);
            entries.push(entry);
        });
        return entries;
    }

    private _createEntity(entry: Entry): EntryEntity {
        const entryEntity = new EntryEntity();
        entryEntity.id = entry.id;
        entryEntity.type = entry.type;
        entryEntity.account = entry.account;
        entryEntity.account_to = entry.account_to;
        entryEntity.tax = entry.tax;
        entryEntity.category = entry.category;
        entryEntity.date = entry.date;
        entryEntity.description = entry.description;
        entryEntity.value = entry.value;
        return entryEntity;
    }

    async createOrUpdateEntry(entry: Entry) {
        let entryEntity = this._createEntity(entry);
        entryEntity = await this._entriesRepository.save(entryEntity, { reload: false });
        entry = new Entry(entryEntity);

        const entry_idx = this._entries.findIndex(x => x.id === entry.id);
        if (entry_idx > -1)
            this._entries[entry_idx] = entry;
        else {
            if (!entry.id)
                entry.id = this._entries.length ? this._entries[this._entries.length - 1].id + 1 : 1;
            this._entries.push(entry);

            this.entries$.next(this.entries);
        }
    }

    async removeEntry(entry: Entry) {
        await this._entriesRepository.delete({ id: entry.id });

        this._entries = this._entries.filter(x => x.id !== entry.id);
        this.entries$.next(this.entries);
    }

}
