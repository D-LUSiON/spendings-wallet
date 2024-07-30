import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountsService } from '@app/services';
import { Account } from '@app/shared/classes';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-account-choose',
    templateUrl: './account-choose.component.html',
    styleUrls: ['./account-choose.component.scss'],
})
export class AccountChooseComponent implements OnInit, OnDestroy {

    accounts: Account[] = [];

    subs: Subscription = new Subscription();

    constructor(
        private _popoverController: PopoverController,
        private _accountsService: AccountsService
    ) {
        this.subs.add(
            _accountsService.accounts$.subscribe((accounts) => {
                this.accounts = accounts;
            })
        );
    }

    ngOnInit() { }

    async onSelect(account: Account) {
        const top = await this._popoverController.getTop();
        if (top)
            top.dismiss(account)
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
