import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IconSet } from '../shared/classes';

@Injectable({
    providedIn: 'root'
})
export class IconsService {

    private _icons: IconSet[] = [];

    icons$: BehaviorSubject<IconSet[]> = new BehaviorSubject(this.icons);

    constructor(
        private _http: HttpClient
    ) {
        this.getAllIconsList().subscribe((icons: IconSet[]) => {
            this._icons = icons;
            this.icons$.next(this.icons);
        });
    }

    get icons() {
        return this._icons.map(icon_set => new IconSet(icon_set));
    }

    getAllIconsList() {
        return this._http.get('/assets/icons-list-array.json');
    }
}
