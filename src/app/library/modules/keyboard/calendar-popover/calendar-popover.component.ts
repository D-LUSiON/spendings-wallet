import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-calendar-popover',
    templateUrl: './calendar-popover.component.html',
    styleUrls: ['./calendar-popover.component.scss'],
})
export class CalendarPopoverComponent implements OnInit {

    @Input()
    date: Date;

    constructor(
        private _popoverController: PopoverController
    ) { }

    ngOnInit() { }

    dateSelected(date?: Date) {
        this.dismiss(date);
    }

    dismiss(date?: Date) {
        this._popoverController.dismiss(date);
    }

}
