import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AccountsService } from '@app/services';
import { AddEntryComponent } from '../entries/add-entry/add-entry.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

    scrolling: boolean = false;

    accounts: any[] = [];

    subs: Subscription = new Subscription();

    constructor(
        private _accountsService: AccountsService,
        private _modalCtrl: ModalController,
    ) {
        this.subs.add(this._accountsService.accounts$.subscribe(accounts => {
            this.accounts = accounts;
            console.log(this.accounts);
        }));
    }

    get all_income() {
        return this.accounts.map(accont => accont.income).reduce((val, acc) => val += acc);
    }

    get all_expences() {
        return this.accounts.map(accont => accont.expences).reduce((val, acc) => val += acc);
    }

    get all_transfers() {
        return this.accounts.map(accont => accont.transfers).reduce((val, acc) => val += acc);
    }

    get balance() {
        return this.accounts.map(accont => accont.balance).reduce((val, acc) => val += acc);
    }

    async openAddEntryModal() {
        const modal = await this._modalCtrl.create({
            component: AddEntryComponent,
            componentProps: {}
        });
        return await modal.present();
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
