import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardComponent } from './keyboard.component';
import { IonicModule } from '@ionic/angular';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { CalendarPopoverComponent } from './calendar-popover/calendar-popover.component';
import { SharedModule } from '@app/shared';



@NgModule({
    declarations: [
        KeyboardComponent,
        CalendarPopoverComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        DatePickerModule,
        SharedModule,
    ],
    exports: [
        KeyboardComponent,
    ]
})
export class KeyboardModule { }
