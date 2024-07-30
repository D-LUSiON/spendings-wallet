import { Category } from './category';
import { FinancialMovementType } from './financial-movement-type.enum';

export class FinancialMovement {
    id: number;
    amount: number;
    type: FinancialMovementType;
    description: string;
    category: Category;
    date: Date;
    transfer_account_id?: number;

    constructor(data?) {
        if (data) {
            if (data.hasOwnProperty('id')) this.id = data['id'];
            if (data.hasOwnProperty('amount')) this.amount = data['amount'];
            if (data.hasOwnProperty('type')) this.type = data['type'];
            if (data.hasOwnProperty('description')) this.description = data['description'];
            if (data.hasOwnProperty('category')) this.category = new Category(data['category']);
            if (data.hasOwnProperty('date')) this.date = new Date(data['date']);
            if (data.hasOwnProperty('transfer_account_id')) this.transfer_account_id = data['transfer_account_id'];
        }
    }
}
