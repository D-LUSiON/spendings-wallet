import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountsPageRoutingModule } from './accounts-routing.module';

import { AccountsPage } from './accounts.page';
import { SharedModule } from '@app/shared';
import { AddAccountComponent } from './add-account/add-account.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        AccountsPageRoutingModule
    ],
    declarations: [
        AccountsPage,
        AddAccountComponent,
    ]
})
export class AccountsPageModule { }
