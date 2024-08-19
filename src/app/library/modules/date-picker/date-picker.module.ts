import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { IonicModule } from '@ionic/angular';
import { DatePickerComponent } from './date-picker.component';
import { PipesModule } from '@app/shared/pipes';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        PipesModule, // FIXME: Opening directly /entries triggers error: ReferenceError: Cannot access 'EntriesByDatePipe' before initialization
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
