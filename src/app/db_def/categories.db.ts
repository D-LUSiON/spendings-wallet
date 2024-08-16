import { Category } from '@app/shared/classes';

export const DB_CATEGORIES_DEFAULT = [
    new Category({ title: 'Gasoline', icon: { prefix: 'la', name: 'gas-pump' } }),
    new Category({ title: 'Toys', icon: { prefix: 'la', name: 'robot' } }),
    new Category({ title: 'Clothing', icon: { prefix: 'la', name: 'tshirt' } }),
    new Category({ title: 'Home repair', icon: { prefix: 'la', name: 'brush' } }),
    new Category({ title: 'Bills', icon: { prefix: 'la', name: 'money-check-alt' } }),
    new Category({ title: 'Charity', icon: { prefix: 'la', name: 'hand-holding-usd', }, active: false }),
    new Category({ title: 'Healthcare', icon: { prefix: 'la', name: 'ambulance' } }),
    new Category({ title: 'Gifts', icon: { prefix: 'la', name: 'gifts' } }),
    new Category({ title: 'Smoking', icon: { prefix: 'la', name: 'smoking' } }),
    new Category({ title: 'Sports', icon: { prefix: 'la', name: 'swimmer' } }),
    new Category({ title: 'Household', icon: { prefix: 'la', name: 'couch' } }),
    new Category({ title: 'Traveling', icon: { prefix: 'la', name: 'globe' } }),
    new Category({ title: 'Pets', icon: { prefix: 'la', name: 'paw' } }),
    new Category({ title: 'Shopping', icon: { prefix: 'la', name: 'shopping-cart' } }),
    new Category({ title: 'Salary', icon: { prefix: 'la', name: 'wallet' }, type: 'income' }),
    new Category({ title: 'Donation', icon: { prefix: 'la', name: 'donate', }, active: false, type: 'income' }),
    new Category({ title: 'Savings', icon: { prefix: 'la', name: 'piggy-bank' }, type: 'income' }),
    new Category({ title: 'Rental', icon: { prefix: 'la', name: 'home' }, type: 'income' }),
]
