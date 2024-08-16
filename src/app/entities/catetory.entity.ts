import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Icon } from '@app/shared/classes';

@Entity({
    name: 'categories'
})
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: '',
        type: 'text'
    })
    title: string;

    @Column({
        type: 'text',
        transformer: {
            from: value => value,
            to: value => JSON.stringify(value),
        }
    })
    icon: Icon;

    @Column({
        default: 1,
        type: 'integer'
    })
    active: boolean;

    @Column({
        type: 'text',
        enum: ['income', 'expence']
    })
    type: 'income' | 'expence';
}
