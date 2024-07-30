import { Injectable } from '@angular/core';
import { Entry } from '@app/shared/classes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EntriesService {

    private _entries: Entry[] = [];

    entries$: BehaviorSubject<Entry[]> = new BehaviorSubject(this.entries);

    constructor() { }

    get entries() {
        return [...this._entries];
    }

    async createOrUpdateEntry(entry: Entry) {
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

}
