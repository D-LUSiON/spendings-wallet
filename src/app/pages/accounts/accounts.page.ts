import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AccountsService } from '@app/services';
import { Account } from '@app/shared/classes';
import { AddAccountComponent } from './add-account/add-account.component';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.page.html',
    styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit, OnDestroy {

    scrolling: boolean = false;

    accounts: Account[] = [];

    subs: Subscription = new Subscription();

    constructor(
        private _modalCtrl: ModalController,
        private _accountsService: AccountsService,
    ) {
        this.subs.add(
            _accountsService.accounts$.subscribe((accounts: Account[]) => {
                this.accounts = accounts;
            })
        );
    }

    ngOnInit() { }

    async editAccount(account?: Account) {
        const modal = await this._modalCtrl.create({
            component: AddAccountComponent,
            componentProps: {
                account
            },
        });

        await modal.present();

        // const { data } = await modal.onDidDismiss();
        // console.log(`Data returned:`, data);

        // if (data)
        //     this._accountsService.createOrUpdateAccount(data);

    }

    async openAddAccountModal() {
        const modal = await this._modalCtrl.create({
            component: AddAccountComponent,
            componentProps: {}
        });

        await modal.present();

        const { data } = await modal.onDidDismiss();

        if (data)
            this._accountsService.createOrUpdateAccount(data);

    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
