import { Component, QueryList, ViewChildren } from '@angular/core';
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
import { DatabaseService } from './services';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    root_routes: Routes = routes;

    appPages = [
        { title: 'Home', url: '/home', icon: 'wallet' },
        { title: 'Entries', url: '/entries', icon: 'list' },
        { title: 'Statistics', url: '/statistics', icon: 'pie-chart' },
        { title: 'Accounts', url: '/accounts', icon: 'cash' },
        { title: 'Categories', url: '/categories', icon: 'apps' },
        { title: 'Settings', url: '/settings', icon: 'settings' },
    ];

    current_url: string = '';
    prev_url: string = '';

    last_back_press_time = 0;
    exit_delay = 2000;

    @ViewChildren(IonRouterOutlet)
    routerOutlets: QueryList<IonRouterOutlet>;

    isWeb: boolean = false;

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
    ) {
        this._platform.ready().then(() => {
            if (this._platform.is('cordova'))
                this.backButtonEvent();

            this.isWeb = Capacitor.getPlatform() === 'web';

            setTimeout(async () => {
                await this._db.initDBConnection();
            }, 10);
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
                    message: 'Press "Back" again to exit the app...',
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
}
