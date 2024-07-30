import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { IonicModule } from '@ionic/angular';
import { DatePickerComponent } from './date-picker.component';



@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
    ],
    declarations: [
        DatePickerComponent,
    ],
    exports: [
        DatePickerComponent,
    ]
})
export class DatePickerModule { }
