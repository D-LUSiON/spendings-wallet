import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '@app/services';
import { Category } from '@app/shared/classes';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddCategoryComponent } from './add-category/add-category.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

    categories: Category[] = [];

    scrolling: boolean = false;

    subs: Subscription = new Subscription();

    constructor(
        private _modalCtrl: ModalController,
        private _categoriesService: CategoriesService,
        private _loadingController: LoadingController,
        private _translate: TranslateService,
    ) {
        this.subs.add(
            _categoriesService.categories$.subscribe((categories: Category[]) => {
                this.categories = categories;
            })
        );
    }

    ngOnInit() {
    }

    async addOrEditCategory(category?: Category) {
        const loading = await this._loadingController.create({
            message: this._translate.instant('Loading icons...')
        });

        await loading.present();

        const modal = await this._modalCtrl.create({
            component: AddCategoryComponent,
            componentProps: {
                category
            },
        });

        await modal.present();

        const { data } = await modal.onDidDismiss();
        if (data)
            this._categoriesService.createOrUpdateCategory(data);

    }

    async openAddCategoryModal() {
        const modal = await this._modalCtrl.create({
            component: AddCategoryComponent,
            componentProps: {}
        });

        const loading = await this._loadingController.create({
            message: this._translate.instant('Loading icons...')
        });

        await loading.present();

        await modal.present();

        const { data } = await modal.onDidDismiss();

        if (data)
            this._categoriesService.createOrUpdateCategory(data);
    }

}
