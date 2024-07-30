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
            if (data.hasOwnProperty('icon')) this.icon = data['icon'];
            if (data.hasOwnProperty('active')) this.active = data['active'];
            if (data.hasOwnProperty('type')) this.type = data['type'];
        }
    }
}
