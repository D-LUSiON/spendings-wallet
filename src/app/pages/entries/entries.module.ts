import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntriesPageRoutingModule } from './entries-routing.module';

import { EntriesPage } from './entries.page';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { SharedModule } from '@app/shared';
import { PreviewEntryComponent } from './preview-entry/preview-entry.component';
import { AppLibraryModule } from '@app/library';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        AppLibraryModule,
        EntriesPageRoutingModule
    ],
    declarations: [
        EntriesPage,
        AddEntryComponent,
        PreviewEntryComponent,
    ]
})
export class EntriesPageModule { }
