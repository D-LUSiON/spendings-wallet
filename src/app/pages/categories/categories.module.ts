import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SharedModule } from '@app/shared';
import { AppLibraryModule } from '@app/library';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        AppLibraryModule,
        CategoriesPageRoutingModule
    ],
    declarations: [
        CategoriesPage,
        AddCategoryComponent
    ]
})
export class CategoriesPageModule { }
