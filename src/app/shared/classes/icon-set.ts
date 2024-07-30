import { Icon } from './icon.interface';

export class IconSet {

    name: string;
    icons: Icon[] = [];

    constructor(data?: object) {
        if (data) {
            if (data.hasOwnProperty('name')) this.name = data['name'];
            if (data.hasOwnProperty('icons')) this.icons = data['icons'];
        }
    }

    iconsPerRow(icons_per_row: number): Icon[][] {
        const icon_rows: Icon[][] = [];
        let icon_row_next_idx: number = -1;
        this.icons.forEach((icon: Icon, idx: number) => {
            if (!(idx % icons_per_row)) {
                icon_row_next_idx++;
                if (!icon_rows[icon_row_next_idx])
                    icon_rows[icon_row_next_idx] = [];
            }
            icon_rows[icon_row_next_idx][idx % icons_per_row] = icon;
        });

        return icon_rows;
    }

}
