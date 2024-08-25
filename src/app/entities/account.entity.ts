import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntryEntity } from './entry.entity';

@Entity({
    name: 'accounts'
})
export class AccountEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: '',
        type: 'text'
    })
    title: string;

    @Column({
        nullable: true,
        default: '',
        type: 'text'
    })
    description: string;

    @Column({
        default: 1,
        type: 'integer'
    })
    active: boolean;

    @Column({
        default: 0,
        type: 'text',
        transformer: {
            from: value => value,
            to: value => !isNaN(+value) ? parseFloat(value) : 0,
        }
    })
    initial_balance: number;

    @OneToMany(
        () => EntryEntity,
        entry => entry.account,
        {
            cascade: false,
            onDelete: 'NO ACTION',
        }
    )
    entries: EntryEntity[];

    @OneToMany(
        () => EntryEntity,
        entry => entry.account_to,
        {
            cascade: false,
            onDelete: 'NO ACTION',
        }
    )
    entries_to: EntryEntity[];

}
