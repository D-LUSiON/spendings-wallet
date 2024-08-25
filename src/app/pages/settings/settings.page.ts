import { Component, OnDestroy } from '@angular/core';
import { DatabaseService, SettingsService } from '@app/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnDestroy {

    languages: { label: string, value: string }[] = [
        {
            label: 'English',
            value: 'en-EN'
        },
        {
            label: 'Български',
            value: 'bg-BG'
        },
    ];

    ui_lang: string;

    subs: Subscription = new Subscription();

    constructor(
        private _settingsService: SettingsService,
        private _databaseService: DatabaseService,
    ) {
        this.subs.add(
            this._settingsService.UILang$.subscribe((ui_lang) => {
                this.ui_lang = ui_lang;
            })
        );
    }

    changeLanguage(lang: string) {
        this._settingsService.ui_lang = lang;
    }

    async exportDB() {
        await this._databaseService.exportDb();
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

}
