import { Currency } from './currency';
import { Entry } from './entry';

export class Account {
    id: number;
    title: string;
    description?: string;
    active: boolean = true;
    initial_balance: number = 0;
    entries: Entry[];
    entries_to: Entry[];
    currency: Currency;

    constructor(data?) {
        if (data) {
            if (data.hasOwnProperty('id')) this.id = data['id'];
            if (data.hasOwnProperty('title')) this.title = data['title'];
            if (data.hasOwnProperty('description')) this.description = data['description'];
            if (data.hasOwnProperty('active')) this.active = data['active'];
            if (data.hasOwnProperty('initial_balance')) this.initial_balance = typeof data['initial_balance'] === 'string' && !isNaN(+data['initial_balance']) ? parseFloat(data['initial_balance']) : data['initial_balance'];
            if (data.hasOwnProperty('entries') && data['entries'] instanceof Array) this.entries = data['entries'].map(x => new Entry(x));
            if (data.hasOwnProperty('entries_to') && data['entries_to'] instanceof Array) this.entries_to = data['entries_to'].map(x => new Entry(x));
            if (data.hasOwnProperty('currency')) this.currency = new Currency(data['currency']);
        }
    }

    get income() {
        const income_entries = this.entries.filter(x => x.type === 'income').map(x => x.value);
        const transfer_income_entries = this.entries_to.filter(x => x.type === 'transfer').map(x => +x.value);
        const all_income_entries = [...income_entries, ...transfer_income_entries];

        if (!all_income_entries.length)
            return 0;
        return all_income_entries.reduce((acc, value) => acc += value);
    }

    get income_wo_transfers() {
        const income_entries = this.entries.filter(x => x.type === 'income').map(x => x.value);

        if (!income_entries.length)
            return 0;
        return income_entries.reduce((acc, value) => acc += value);
    }

    get expences() {
        const expence_entries = this.entries.filter(x => ['expence', 'transfer'].includes(x.type)).map(x => x.value);

        if (!expence_entries.length)
            return 0;
        return expence_entries.reduce((acc, value) => acc += value);
    }

    get expences_wo_transfers() {
        const expence_entries = this.entries.filter(x => x.type === 'expence').map(x => x.value);

        if (!expence_entries.length)
            return 0;
        return expence_entries.reduce((acc, value) => acc += value);
    }

    get transfers() {
        const transfer_entries = this.entries.filter(x => x.type === 'transfer').map(x => -(x.value + x.tax));

        if (!transfer_entries.length)
            return 0;
        return transfer_entries.reduce((acc, value) => acc += value);
    }

    get balance() {
        return this.initial_balance + this.income - this.expences;
    }

    getMovementsByMonth(year: number, month: number) {
        const min_date_string = `${year}-${month}`;
        const min_date = new Date(min_date_string);
        min_date.setHours(0, 0, 0, 0);

        const max_date_string = `${year}-${month + 1}`;
        const max_date = new Date(new Date(max_date_string).setDate(0));
        max_date.setHours(23, 59, 59, 999);
    }
}
