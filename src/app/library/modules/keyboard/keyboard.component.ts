import { Component, EventEmitter, Input, OnChanges, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { CalendarPopoverComponent } from './calendar-popover/calendar-popover.component';

const MATH_OPERATIONS_REGEX = /[\+\-\*\/]$/;

@Component({
    selector: 'app-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input() value: number = 0;
    @Output() valueChange: EventEmitter<number> = new EventEmitter();

    value_acc: string = '';
    value_view: string = this.value.toFixed(2);

    @Input() date: Date = new Date();
    @Output() dateChange: EventEmitter<Date> = new EventEmitter();

    input_string: string = '';

    @Input()
    disabled: boolean = true;

    today: Date = new Date();

    @Input() description: string = '';
    @Output() descriptionChange: EventEmitter<string> = new EventEmitter();
    @Output() done: EventEmitter<[number, Date]> = new EventEmitter();

    constructor(
        @Optional() @Self() public _controlDirective: NgControl,
        private _popoverController: PopoverController
    ) {
        if (_controlDirective)
            _controlDirective.valueAccessor = this;
    }

    ngOnInit() {
        console.log(`ngOnInit`, this);
    }

    ngOnChanges(changes) {
        console.log(`ngOnChanges`, changes);
    }

    onChange = (value: number | string | object) => {
        console.log(`keyboard onChange`, value);
    };

    onTouched = () => { };

    writeValue(value: number): void {
        console.log(`keyboard writeValue`, value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    descriptionChanged(event) {
        this.description = event.target.value;
        console.log(`descriptionChanged`, this.description);
        this.descriptionChange.emit(this.description);
    }

    clicked(val: number | string) {
        if (typeof val === 'number') {
            if (!this.input_string.match(MATH_OPERATIONS_REGEX)) {
                let value: any = this.value;
                // 0.00 -> 0.01 -> 0.10 -> 1.00 -> 10.00 and so on...
                if (this.value === 0) {
                    this.value = +`0.0${val}`;
                } else {
                    value = Math.round(((this.value * 100) / 10) * 100) / 100;
                    this.value = Math.round((value + +`0.0${val}`) * 100) / 100;
                }

                this.input_string = this.value.toFixed(2);
            } else {
                this.input_string += val;
            }
        } else {
            switch (val) {
                case '+':
                case '-':
                case '*':
                case '/':
                case '=':
                    if (this.value_acc.match(MATH_OPERATIONS_REGEX) || val === '=') {
                        const val_acc = +`${this.value_acc.replace(MATH_OPERATIONS_REGEX, '')}`;
                        switch (this.value_acc.charAt(this.value_acc.length - 1)) {
                            case '+':
                                this.value = val_acc + this.value;
                                break;
                            case '-':
                                this.value = val_acc - this.value;
                                break;
                            case '*':
                                this.value = val_acc * this.value;
                                break;
                            case '/':
                                this.value = val_acc / this.value;
                                break;
                        }
                    }

                    if (val === '=') {
                        this.value_acc = '';
                        this.input_string = this.value.toFixed(2);
                    } else {
                        this.value_acc = `${this.value}${val}`;
                        this.value = 0;
                        this.input_string = '0.00';
                    }
                    break;
                case '.':
                    if (!this.input_string.includes('.')) {
                        if (this.input_string.length === 0)
                            this.input_string = '0';
                        this.input_string += val;
                    }
                    break;
                case 'erase':
                    // FIXTHIS:
                    const input_string = this.input_string.substring(0, this.input_string.length - 2);

                    this.value = +input_string * 10 / 100;
                    this.input_string = this.value.toFixed(2);
                    break;
                case 'calendar':
                    this.showCalendar();
                    break;
                case 'done':
                    this.done.emit([this.value, this.date]);
                    break;
                case 'cls':
                default:
                    this.value = 0;
                    this.input_string = '0.00';
                    break;
            }
        }

        this.value_view = this.input_string;
        this.onChange(this.value);
    }

    async showCalendar() {
        const popover = await this._popoverController.create({
            component: CalendarPopoverComponent,
            componentProps: {
                date: this.date
            }
        });

        await popover.present();

        const { data } = await popover.onDidDismiss();

        this.date = data;
        this.dateChange.emit(this.date);
    }


}
