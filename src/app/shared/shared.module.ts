import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyPipe } from './pipes/currency.pipe';
import { FormatIconNamePipe } from './pipes/format-icon-name.pipe';
import { ConsoleLogPipe } from './pipes/log.pipe';
import { EntriesByDatePipe } from './pipes/entries-by-date.pipe';
import { EntriesBallancePipe } from './pipes/entries-ballance.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
    declarations: [
        CurrencyPipe,
        FormatIconNamePipe,
        ConsoleLogPipe,
        EntriesByDatePipe,
        EntriesBallancePipe,
        SortPipe,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        CurrencyPipe,
        FormatIconNamePipe,
        ConsoleLogPipe,
        EntriesByDatePipe,
        EntriesBallancePipe,
        SortPipe,
    ]
})
export class SharedModule { }
