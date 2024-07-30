import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountChooseComponent } from './account-choose/account-choose.component';
import { SharedModule } from '@app/shared';
import { IonicModule } from '@ionic/angular';



@NgModule({
    declarations: [
        AccountChooseComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
    ],
    exports: [
        AccountChooseComponent
    ]
})
export class AccountChooseModule { }
