import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './pipes';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        TranslateModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        TranslateModule,
        PipesModule,
    ]
})
export class SharedModule { }
