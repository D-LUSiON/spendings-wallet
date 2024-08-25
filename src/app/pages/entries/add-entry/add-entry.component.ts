import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountChooseComponent } from '@app/library/modules/account-choose/account-choose/account-choose.component';
import { AccountsService, CategoriesService, EntriesService } from '@app/services';
import { Account, Category, Entry } from '@app/shared/classes';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-entry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.scss'],
})
export class AddEntryComponent implements OnInit, OnDestroy {

    @Input()
    entry: Entry;

    tab: 'expence' | 'income' | 'transfer' = 'expence';

    accounts: Account[] = [];
    categories: Category[] = [];

    addExpenceForm: FormGroup;

    subs: Subscription = new Subscription();

    constructor(
        private _fb: FormBuilder,
        private _modalCtrl: ModalController,
        private _popoverController: PopoverController,
        private _entriesService: EntriesService,
        private _categoriesService: CategoriesService,
        private _accountsService: AccountsService,
    ) {
        this._initForm();
        this.subs.add(
            this._accountsService.accounts$.subscribe((accounts) => {
                this.accounts = accounts.filter(account => account.active);
            })
        );
        this.subs.add(
            this._categoriesService.categories$.subscribe((categories) => {
                this.categories = categories.filter(category => category.active);
            })
        );
    }

    ngOnInit() {
        if (this.entry) {
            this.addExpenceForm.patchValue(this.entry);
            this.tab = this.entry.type;
        }
    }

    async clickSetAccount() {
        const popover = await this._popoverController.create({
            component: AccountChooseComponent,
        });

        await popover.present();

        const result = await popover.onDidDismiss();
        this.addExpenceForm.patchValue({
            account: result.data
        });
    }

    async clickSetAccountTo() {
        const popover = await this._popoverController.create({
            component: AccountChooseComponent,
        });

        await popover.present();

        const result = await popover.onDidDismiss();
        this.addExpenceForm.patchValue({
            account_to: result.data
        });
    }

    private _initForm() {
        this.addExpenceForm = this._fb.group({
            type: this._fb.control(this.tab, [Validators.required]),
            account: this._fb.control(undefined, [Validators.required]),
            account_to: this._fb.control(undefined),
            tax: this._fb.control(undefined),
            category: this._fb.control(undefined, [Validators.required]),
            date: this._fb.control(new Date(), [Validators.required]),
            description: this._fb.control(''),
            value: this._fb.control(0, [Validators.required]),
        });
    }

    segmentChanged(event: any) {
        this.tab = event.detail.value;
        this.addExpenceForm.patchValue({
            type: this.tab
        });
        switch (this.tab) {
            case 'expence':
            case 'income':
                this.addExpenceForm.get('category').setValidators(Validators.required);
                // this.addExpenceForm.get('account_to').setValidators(null);
                this.addExpenceForm.get('account_to').clearValidators();
                this.addExpenceForm.get('category').updateValueAndValidity();
                this.addExpenceForm.get('account_to').updateValueAndValidity();
                break;
            case 'transfer':
                // this.addExpenceForm.get('category').setValidators(null);
                this.addExpenceForm.get('category').clearValidators();
                this.addExpenceForm.get('account_to').setValidators(Validators.required);
                this.addExpenceForm.get('category').updateValueAndValidity();
                this.addExpenceForm.get('account_to').updateValueAndValidity();
                break;
        }
    }

    filteredCategories() {
        return this.categories.filter(category => category.type === this.tab);
    }

    selectCategory(category: Category) {
        this.addExpenceForm.patchValue({
            category
        });
    }

    setDate(date: Date) {
        this.addExpenceForm.patchValue({
            date
        });
    }

    descriptionChanged(description: string) {
        this.addExpenceForm.patchValue({
            description
        });
    }

    dismiss() {
        this._modalCtrl.dismiss();
    }

    async onSubmit() {
        if (this.addExpenceForm.valid) {
            if (this.addExpenceForm.value['type'] === 'transfer')
                this.addExpenceForm.patchValue({
                    category: undefined
                });
            if (this.addExpenceForm.value['type'] !== 'transfer')
                this.addExpenceForm.patchValue({
                    account_to: undefined
                });

            const entry = new Entry(this.addExpenceForm.value);

            await this._entriesService.createOrUpdateEntry(entry);
            this._modalCtrl.dismiss();
        } else {
            // TODO: Highlight invalid fields
            for (let key in this.addExpenceForm.controls) {
                console.log(`${key}:`, this.addExpenceForm.controls[key].valid);
            }
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
