import { Icon } from './icon.interface';

export class Category {
    id: number;
    title: string;
    icon: Icon;
    active: boolean = true;
    type: 'income' | 'expence' = 'expence';

    constructor(data?) {
        if (data) {
            if (data.hasOwnProperty('id')) this.id = data['id'];
            if (data.hasOwnProperty('title')) this.title = data['title'];
            if (data.hasOwnProperty('icon')) this.icon = typeof data['icon'] === 'string' ? JSON.parse(data['icon']) : data['icon'];
            if (data.hasOwnProperty('active')) this.active = typeof data['active'] === 'boolean' ? data['active'] : !!data['active'];
            if (data.hasOwnProperty('type')) this.type = data['type'];
        }
    }

    format() {
        const formatted = [!!this.id ? this.id : null, this.title];
        formatted.push(!!this.icon ? JSON.stringify(this.icon) : null);
        formatted.push(this.active ? 1 : 0);
        formatted.push(this.type);
        return formatted;
    }
}
