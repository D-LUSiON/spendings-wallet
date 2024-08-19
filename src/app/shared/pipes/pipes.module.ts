import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './currency.pipe';
import { EntriesBallancePipe } from './entries-ballance.pipe';
import { FormatIconNamePipe } from './format-icon-name.pipe';
import { ConsoleLogPipe } from './log.pipe';
import { EntriesByDatePipe } from './entries-by-date.pipe';
import { SortPipe } from './sort.pipe';

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
        CommonModule
    ],
    exports: [
        CurrencyPipe,
        FormatIconNamePipe,
        ConsoleLogPipe,
        EntriesByDatePipe,
        EntriesBallancePipe,
        SortPipe,
    ]
})
export class PipesModule { }
