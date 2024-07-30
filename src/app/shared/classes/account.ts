import { Currency } from './currency';
import { FinancialMovement } from './financial-movement';
import { FinancialMovementType } from './financial-movement-type.enum';

export class Account {
    id: number;
    title: string;
    description?: string;
    active: boolean = true;
    initial_balance: number = 0;
    financial_movements: FinancialMovement[] = [];
    currency: Currency;

    constructor(data?) {
        if (data) {
            if (data.hasOwnProperty('id')) this.id = data['id'];
            if (data.hasOwnProperty('title')) this.title = data['title'];
            if (data.hasOwnProperty('description')) this.description = data['description'];
            if (data.hasOwnProperty('active')) this.active = data['active'];
            if (data.hasOwnProperty('initial_balance')) this.initial_balance = data['initial_balance'];
            if (data.hasOwnProperty('financial_movements') && data['financial_movements'] instanceof Array) this.financial_movements = data['financial_movements'].map(x => new FinancialMovement(x));
            if (data.hasOwnProperty('currency')) this.currency = new Currency(data['currency']);
        }
    }

    get income() {
        if (this.financial_movements.filter(x => x.type === FinancialMovementType.Credit && !x.transfer_account_id).length)
            return this.financial_movements.filter(x => x.type === FinancialMovementType.Credit && !x.transfer_account_id).map(x => x.amount).reduce((acc, value) => acc += value);
        else
            return 0;
    }

    get expences() {
        if (this.financial_movements.filter(x => x.type === FinancialMovementType.Debit && !x.transfer_account_id).length)
            return this.financial_movements.filter(x => x.type === FinancialMovementType.Debit && !x.transfer_account_id).map(x => x.amount).reduce((acc, value) => acc += value);
        else
            return 0;
    }

    get transfers() {
        if (this.financial_movements.filter(x => x.transfer_account_id).length)
            return this.financial_movements.filter(x => x.transfer_account_id).map(x => x.amount).reduce((acc, value) => acc += value);
        else
            return 0;
    }

    get balance() {
        return this.initial_balance + this.income - this.expences + this.transfers;
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
