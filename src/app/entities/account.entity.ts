import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
            to: value => parseFloat(value),
        }
    })
    initial_balance: number;

    // @OneToMany(
    //     () => FinancialMovementEntity,
    //     movement => movement.account,
    //     {
    //         cascade: true,
    //     }
    // )
    // financial_movements: FinancialMovementEntity[];


    // @OneToOne(() => CurrencyEntity)
    // @JoinColumn()
    // currency: CurrencyEntity

}
