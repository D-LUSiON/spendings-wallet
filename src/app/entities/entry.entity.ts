import { Account, Category } from '@app/shared/classes';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './catetory.entity';
import { AccountEntity } from './account.entity';
import { Tools } from '@app/shared';

@Entity({
    name: 'entries'
})
export class EntryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        enum: ['expence', 'income', 'transfer']
    })
    type: 'expence' | 'income' | 'transfer';

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
    account_to: Account;

    @Column({
        nullable: true,
        type: 'text',
        transformer: {
            from: value => value,
            to: value => value !== null && !isNaN(+value) ? parseFloat(value) : null,
        }
    })
    tax: number;

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

    @Column({
        type: 'text'
    })
    description: string;

    @Column({
        default: 0,
        type: 'text',
        transformer: {
            from: value => value,
            to: value => value !== null && !isNaN(+value) ? parseFloat(value) : 0,
        }
    })
    value: number;

}
