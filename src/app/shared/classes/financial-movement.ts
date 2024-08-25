import { Account } from './account';
import { Category } from './category';
import { FinancialMovementType } from './financial-movement-type.enum';

export class FinancialMovement {
    id: number;
    amount: number;
    tax: number;
    type: FinancialMovementType;
    description: string;
    category: Category;
    date: Date;
    account: Account;
    transfer_account?: Account;

    constructor(data?) {
        if (data) {
            if (data.hasOwnProperty('id')) this.id = data['id'];
            if (data.hasOwnProperty('amount')) this.amount = data['amount'];
            if (data.hasOwnProperty('tax')) this.tax = data['tax'];
            if (data.hasOwnProperty('type')) this.type = data['type'];
            if (data.hasOwnProperty('description')) this.description = data['description'];
            if (data.hasOwnProperty('category')) this.category = new Category(data['category']);
            if (data.hasOwnProperty('date')) this.date = new Date(data['date']);
            if (data.hasOwnProperty('account')) this.account = new Account(data['account']);
            if (data.hasOwnProperty('transfer_account')) this.transfer_account = new Account(data['transfer_account']);
        }
    }
}
