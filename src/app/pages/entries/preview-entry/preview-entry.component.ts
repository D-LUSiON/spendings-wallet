import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '@app/shared/classes';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-preview-entry',
    templateUrl: './preview-entry.component.html',
    styleUrls: ['./preview-entry.component.scss'],
})
export class PreviewEntryComponent implements OnInit {

    @Input()
    entry: Entry;

    constructor(
        private _modalCtrl: ModalController
    ) {
        console.log(`preview entry constructor`, this.entry);
    }

    ngOnInit() {
        console.log(`preview entry ngOnInit`, this.entry);
    }

    dismiss() {
        this._modalCtrl.dismiss();
    }

}
