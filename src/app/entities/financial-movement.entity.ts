import { Account, Category, FinancialMovement, FinancialMovementType } from '@app/shared/classes';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './catetory.entity';
import { Tools } from '@app/shared';
import { AccountEntity } from './account.entity';

@Entity({
    name: 'financial_movements'
})
export class FinancialMovementEntity implements FinancialMovement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: 0,
        type: 'text',
        transformer: {
            from: value => value,
            to: value => value !== null && !isNaN(+value) ? parseFloat(value) : 0,
        }
    })
    amount: number;

    @Column({
        nullable: true,
        type: 'text',
        transformer: {
            from: value => value,
            to: value => value !== null && !isNaN(+value) ? parseFloat(value) : null,
        }
    })
    tax: number;

    @Column({
        type: 'text',
        enum: ['Credit', 'Debit']
    })
    type: FinancialMovementType;

    @Column({
        type: 'text'
    })
    description: string;

    @ManyToOne(
        () => CategoryEntity,
        category => category.entries,
        {
            onDelete: 'NO ACTION',
            cascade: false,
        }
    )
    @JoinColumn({
        name: 'category_id'
    })
    category: Category;

    @Column({
        type: 'text',
        default: () => 'CURRENT_TIMESTAMP',
        transformer: {
            from: value => Tools.formatDate(value, 'YYYY-MM-DD'),
            to: value => new Date(value),
        }
    })
    date: Date;

    @ManyToOne(
        () => AccountEntity,
        account => account.entries,
        {
            onDelete: 'NO ACTION',
            cascade: false,
        }
    )
    @JoinColumn({
        name: 'account_id',
    })
    account: Account;

    @ManyToOne(
        () => AccountEntity,
        account => account.entries_to,
        {
            nullable: true,
            onDelete: 'NO ACTION',
            cascade: false,
        }
    )
    @JoinColumn({
        name: 'account_to_id',
    })
    transfer_account?: Account;

}
