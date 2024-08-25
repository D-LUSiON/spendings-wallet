import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntriesService } from '@app/services';
import { Entry, TEntriesCollection } from '@app/shared/classes';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { PreviewEntryComponent } from './preview-entry/preview-entry.component';
import { TranslateService } from '@ngx-translate/core';
import { Tools } from '@app/shared';

@Component({
    selector: 'app-entries',
    templateUrl: './entries.page.html',
    styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit, OnDestroy {

    scrolling: boolean = false;

    entries: Entry[] = [];

    subs: Subscription = new Subscription();

    constructor(
        private _modalCtrl: ModalController,
        private _alertController: AlertController,
        private _entriesService: EntriesService,
        private _translate: TranslateService,
    ) {
        this.subs.add(
            this._entriesService.entries$.subscribe((entries: Entry[]) => {
                this.entries = entries;
            })
        );
    }

    ngOnInit() { }

    async openEntryModal(entry?: Entry) {
        const modal = await this._modalCtrl.create({
            component: AddEntryComponent,
            componentProps: {
                entry
            }
        });

        return await modal.present();
    }

    async previewEntry(entry: Entry) {
        const modal = await this._modalCtrl.create({
            component: PreviewEntryComponent,
            componentProps: {
                entry
            }
        });

        return await modal.present();
    }

    async onDelete(entry: Entry) {
        const alert = await this._alertController.create({
            header: this._translate.instant('Delete entry?'),
            message: 'Are you sure you want to delete this entry?',
            buttons: [
                {
                    text: this._translate.instant('Cancel'),
                    role: 'cancel'
                },
                {
                    text: this._translate.instant('Delete'),
                    role: 'delete'
                }
            ]
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();

        if (role === 'delete')
            await this._entriesService.removeEntry(entry);

    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
