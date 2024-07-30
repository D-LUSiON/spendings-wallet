import { Account } from './account';
import { Category } from './category';

export class Entry {

    id: number;
    type: 'expence' | 'income' | 'transfer' = 'expence';
    account: Account;
    account_to?: Account;
    category: Category;
    date: Date = new Date();
    description: string;
    value: number;

    constructor(data?: object) {
        if (data) {
            if (data.hasOwnProperty('id')) this.id = data['id'];
            if (data.hasOwnProperty('type')) this.type = data['type'];
            if (data.hasOwnProperty('account')) this.account = new Account(data['account']);
            if (data.hasOwnProperty('account_to') && data['account_to']) this.account_to = new Account(data['account_to']);
            if (data.hasOwnProperty('category')) this.category = new Category(data['category']);
            if (data.hasOwnProperty('date')) this.date = new Date(data['date']);
            if (data.hasOwnProperty('description')) this.description = data['description'];
            if (data.hasOwnProperty('value')) this.value = data['value'];
        }
    }

}
