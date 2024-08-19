import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private _UI_Lang: string = 'en-EN';
    private _ui_lang_storage_key: string = 'ui_lang';

    UILang$: BehaviorSubject<string> = new BehaviorSubject(this.ui_lang);

    constructor() {
        if (!localStorage.getItem(this._ui_lang_storage_key)) {
            localStorage.setItem(this._ui_lang_storage_key, this._UI_Lang);
        }
    }

    get ui_lang() {
        return this._UI_Lang;
    }

    set ui_lang(lang: string) {
        this._UI_Lang = lang;
        localStorage.setItem(this._ui_lang_storage_key, this._UI_Lang);
        this.UILang$.next(this.ui_lang);
    }

    async loadSettings() {
        this._UI_Lang = localStorage.getItem(this._ui_lang_storage_key);
        this.UILang$.next(this.ui_lang);
    }
}
