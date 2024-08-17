import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AccountsService } from '@app/services';
import { Account } from '@app/shared/classes';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit, OnChanges {

    @Input()
    account: Account;

    accountForm: FormGroup;

    constructor(
        private _modalCtrl: ModalController,
        private _alertController: AlertController,
        private _accountsService: AccountsService,
        private _fb: FormBuilder,
    ) {
        this._initForm();
    }

    ngOnInit() {
        if (this.account)
            this.accountForm.patchValue(this.account);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('account') && this.accountForm)
            this.accountForm.patchValue(this.account);
    }

    private _initForm() {
        this.accountForm = this._fb.group({
            id: this._fb.control(null),
            title: this._fb.control('', [Validators.required]),
            description: this._fb.control(''),
            active: this._fb.control(true),
            initial_balance: this._fb.control(null, [Validators.required]),
        });
    }

    async dismiss(save: boolean = false) {
        if (save)
            await this._accountsService.createOrUpdateAccount(new Account(this.accountForm.value));

        this._modalCtrl.dismiss();
    }

    async remove() {
        const alert = await this._alertController.create({
            header: 'Delete account?',
            message: 'Are you sure you want to delete this account?',
            buttons: [
                'Cancel',
                {
                    text: 'Delete',
                    role: 'delete'
                }
            ]
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();

        if (role === 'delete')
            await this._accountsService.removeAccount(this.account);

        this.dismiss();
    }

}
