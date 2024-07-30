import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { KeyboardModule } from './modules/keyboard/keyboard.module';
import { IconChooseModule } from './modules/icon-choose/icon-choose.module';
import { DatePickerModule } from './modules/date-picker/date-picker.module';
import { AccountChooseModule } from './modules/account-choose/account-choose.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        KeyboardModule,
        ScrollingModule,
        IconChooseModule,
        DatePickerModule,
        AccountChooseModule,
    ],
    exports: [
        ScrollingModule,
        KeyboardModule,
        IconChooseModule,
        DatePickerModule,
        AccountChooseModule,
    ]
})
export class AppLibraryModule { }
