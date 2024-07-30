import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntriesService } from '@app/services';
import { Entry } from '@app/shared/classes';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { PreviewEntryComponent } from './preview-entry/preview-entry.component';

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
        private _entriesService: EntriesService,
    ) {
        this.subs.add(
            this._entriesService.entries$.subscribe((entries: Entry[]) => {
                this.entries = entries.sort((entry, next) => entry.date.getTime() - next.date.getTime()).reverse();
            })
        );
    }

    ngOnInit() {
    }

    async openAddEntryModal() {
        const modal = await this._modalCtrl.create({
            component: AddEntryComponent,
            componentProps: {}
        });
        return await modal.present();
    }

    async previewEntry(entry) {
        const modal = await this._modalCtrl.create({
            component: PreviewEntryComponent,
            componentProps: {
                entry
            }
        });
        return await modal.present();
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
