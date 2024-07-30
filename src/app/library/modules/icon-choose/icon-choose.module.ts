import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IconChooseComponent } from './icon-choose.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
    declarations: [
        IconChooseComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        HttpClientModule,
        ScrollingModule
    ],
    exports: [
        IconChooseComponent
    ]
})
export class IconChooseModule { }
