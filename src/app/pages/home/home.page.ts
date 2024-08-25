import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AccountsService, EntriesService } from '@app/services';
import { AddEntryComponent } from '../entries/add-entry/add-entry.component';
import { Account } from '@app/shared/classes';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

    scrolling: boolean = false;

    accounts: Account[] = [];

    subs: Subscription = new Subscription();

    constructor(
        private _accountsService: AccountsService,
        private _entriesService: EntriesService,
        private _modalCtrl: ModalController,
    ) {
        this.subs.add(this._accountsService.accounts$.subscribe(accounts => {
            this.accounts = accounts;
        }));

        this.subs.add(this._entriesService.entries$.subscribe(() => {
            this._accountsService.getAll();
        }));
    }

    get all_income() {
        const all_income = this.accounts.map(accont => accont.income_wo_transfers);
        if (all_income.length)
            return all_income.reduce((val, acc) => val += acc);
        else
            return 0;
    }

    get all_expences() {
        const all_expences = this.accounts.map(accont => accont.expences_wo_transfers);
        if (all_expences.length)
            return all_expences.reduce((val, acc) => val -= acc);
        else
            return 0;
    }

    get all_transfers() {
        const all_transfers = this.accounts.map(accont => accont.transfers);
        if (all_transfers.length)
            return all_transfers.reduce((val, acc) => val += acc);
        else
            return 0;
    }

    get balance() {
        const balance = this.accounts.map(accont => accont.balance);
        if (balance.length)
            return balance.reduce((val, acc) => val += acc);
        else
            return 0;
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
