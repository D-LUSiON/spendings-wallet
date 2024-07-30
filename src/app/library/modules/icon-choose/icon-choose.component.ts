import { AfterViewInit, Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Icon, IconSet } from '@app/shared/classes';

@Component({
    selector: 'app-icon-choose',
    templateUrl: './icon-choose.component.html',
    styleUrls: ['./icon-choose.component.scss'],
})
export class IconChooseComponent implements OnInit, AfterViewInit, ControlValueAccessor {

    @Input()
    label: string = '';

    @Input()
    icons: IconSet[] = [];

    filtered_icons: IconSet[] = [];

    @Input()
    disabled: boolean = false;

    @Output()
    iconsInit: EventEmitter<void> = new EventEmitter();

    value: Icon;

    selected_icon: Icon;

    constructor(
        @Optional() @Self() public _controlDirective: NgControl,
    ) {
        if (this._controlDirective)
            this._controlDirective.valueAccessor = this;
    }

    ngOnInit() {
        // TODO: Icons filtering
        // this.filtered_icons = [...this.icons];
    }

    ngAfterViewInit() {
        this.iconsInit.emit();
    }

    selectIcon(icon: Icon) {
        this.selected_icon = (icon?.name === this.selected_icon?.name) ? null : icon;
        this.writeValue(this.selected_icon);
        this.onChange(this.value);
        this.onTouched();
    }

    // filterIcons(search_string: string | number) {
    //     let filtered_icons = [...this.icons];
    //     if (search_string) {
    //         filtered_icons.forEach(iconSet => {
    //             iconSet.icons = iconSet.icons.filter(icon => icon.name.toLowerCase().includes(search_string.toString().toLowerCase()));
    //         });
    //         filtered_icons = filtered_icons.filter(iconSet => iconSet.icons.length);
    //     }
    //     this.filtered_icons = filtered_icons;
    // }

    writeValue(icon: Icon): void {
        this.value = icon;
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

    onChange(value: Icon) { }

    onTouched = () => { };

}
