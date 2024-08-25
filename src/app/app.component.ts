import { Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Router, Routes } from '@angular/router';
import {
    ActionSheetController,
    AlertController,
    IonRouterOutlet,
    MenuController,
    ModalController,
    Platform,
    PopoverController,
    ToastController

} from '@ionic/angular';
import { routes } from './app-routing.module';
import { DatabaseService, SettingsService } from './services';
import { Capacitor } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {

    root_routes: Routes = routes;

    appPages = [
        { title: 'Home', defaultTitle: 'Home', url: '/home', icon: 'wallet' },
        { title: 'Income / Expences', defaultTitle: 'Income / Expences', url: '/entries', icon: 'list' },
        { title: 'Statistics', defaultTitle: 'Statistics', url: '/statistics', icon: 'pie-chart' },
        { title: 'Accounts', defaultTitle: 'Accounts', url: '/accounts', icon: 'cash' },
        { title: 'Categories', defaultTitle: 'Categories', url: '/categories', icon: 'apps' },
        { title: 'Settings', defaultTitle: 'Settings', url: '/settings', icon: 'settings' },
    ];

    current_url: string = '';
    prev_url: string = '';

    last_back_press_time = 0;
    exit_delay = 2000;

    @ViewChildren(IonRouterOutlet)
    routerOutlets: QueryList<IonRouterOutlet>;

    isWeb: boolean = false;

    subs: Subscription = new Subscription();

    constructor(
        private _platform: Platform,
        private _router: Router,
        private _alertController: AlertController,
        private _actionSheetCtrl: ActionSheetController,
        private _popoverCtrl: PopoverController,
        private _modalCtrl: ModalController,
        private _menu: MenuController,
        private _toast: ToastController,
        private _db: DatabaseService,
        private _translate: TranslateService,
        private _settingsService: SettingsService,
    ) {
        this._platform.ready().then(async () => {
            if (this._platform.is('cordova'))
                this.backButtonEvent();

            this.isWeb = Capacitor.getPlatform() === 'web';

            this.subs.add(
                this._settingsService.UILang$.subscribe(async (ui_lang) => {
                    await firstValueFrom(this._translate.use(ui_lang));
                    this._setTranslations();
                })
            );

            setTimeout(async () => { // Timeout for the view to be updated **fkin' jeep-sqlite**
                await this._db.initDBConnection();
            });
        });
    }

    private _setTranslations() {
        this.appPages.forEach(app_page => {
            app_page.title = this._translate.instant(app_page.defaultTitle);
        });
    }

    backButtonEvent() {
        this._platform.backButton.subscribeWithPriority(99999, async () => {
            this.prev_url = this._router.url;
            const alert = await this._alertController.getTop();
            const actionSheet = await this._actionSheetCtrl.getTop();
            const popOver = await this._popoverCtrl.getTop();
            const modal = await this._modalCtrl.getTop();
            const menu = await this._menu.getOpen();

            if (alert)
                alert.dismiss();
            else if (actionSheet)
                actionSheet.dismiss();
            else if (popOver)
                popOver.dismiss();
            else if (modal)
                modal.dismiss();
            else if (menu)
                menu.close();
            else {
                this.routerOutlets.first.pop().then(() => {
                    this.current_url = this._router.url;
                    if (this.current_url === this.prev_url && this.root_routes.map(x => `/${x.path}`).includes(this._router.url)) {
                        // this.aboutToExit();
                        this.onExit();
                    }
                });
            }
        });
    }

    async aboutToExit() {
        if (this.current_url === '/home') {
            this.onExit();
        } else {
            const now = new Date().getTime();
            if ((now - this.last_back_press_time) < this.exit_delay) {
                this.onExit();
            } else {
                const toast = await this._toast.create({
                    message: this._translate.instant('Press "Back" again to exit the app...'),
                    duration: this.exit_delay,
                });
                toast.present();
                this.last_back_press_time = now;
            }
        }
    }

    onExit() {
        navigator['app'].exitApp();
    }

    async ngOnDestroy() {
        await this._db.disconnectDB();
        this.subs.unsubscribe();
    }
}
