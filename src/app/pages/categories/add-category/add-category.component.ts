import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CategoriesService, IconsService } from '@app/services';
import { Category, IconSet } from '@app/shared/classes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    @Input()
    category: Category;

    icons: IconSet[] = [];

    categoryForm: FormGroup;

    subs: Subscription = new Subscription();

    constructor(
        private _fb: FormBuilder,
        private _alertController: AlertController,
        private _modalCtrl: ModalController,
        private _iconsService: IconsService,
        private _categoriesService: CategoriesService,
        private _loadingController: LoadingController,
        private _translate: TranslateService,
    ) {
        this._initForm();

        this.subs.add(
            this._iconsService.icons$.subscribe(icons => {
                this.icons = icons;
            })
        );
    }

    ngOnInit() {
        if (this.category)
            this.categoryForm.patchValue(this.category);
    }

    afterIconsInit() {
        setTimeout(async () => {
            const loading = await this._loadingController.getTop();
            loading.dismiss();
        }, 1500);
    }

    async ngAfterViewInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('category') && this.categoryForm)
            this.categoryForm.patchValue(this.category);
    }

    private _initForm() {
        this.categoryForm = this._fb.group({
            id: this._fb.control(null),
            title: this._fb.control('', [Validators.required]),
            icon: this._fb.control(null),
            enabled: this._fb.control(true),
        });
    }

    dismiss(save: boolean = false) {
        this._modalCtrl.dismiss(save ? new Category(this.categoryForm.value) : undefined);
    }

    async remove() {
        const alert = await this._alertController.create({
            header: this._translate.instant('Delete category?'),
            message: this._translate.instant('Are you sure you want to delete this category?'),
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Delete',
                    role: 'delete'
                }
            ]
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
        if (role === 'delete')
            await this._categoriesService.removeCategory(this.category);

        this.dismiss();
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
