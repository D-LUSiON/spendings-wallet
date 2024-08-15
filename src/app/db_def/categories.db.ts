import { JsonSQLite } from '@capacitor-community/sqlite';
import { DB_NAME } from './database.db';
import { Category } from '@app/shared/classes';

export const DB_CATEGORIES: JsonSQLite = {
    database: DB_NAME,
    version: 1,
    encrypted: false,
    mode: 'no-encryption',
    tables: [
        {
            name: 'categories',
            schema: [
                { column: `id`, value: `INTEGER PRIMARY KEY AUTOINCREMENT` },
                { column: `title`, value: `TEXT NOT NULL` },
                { column: `icon`, value: `TEXT` },
                { column: `active`, value: `INTEGER DEFAULT 1` },
                { column: `type`, value: `TEXT NOT NULL DEFAULT "expence"` },
            ]
        }
    ]
};

export const DB_CATEGORIES_DEFAULT = [
    new Category({ title: 'Gasoline', icon: { prefix: 'la', name: 'gas-pump' } }).format(),
    new Category({ title: 'Toys', icon: { prefix: 'la', name: 'robot' } }).format(),
    new Category({ title: 'Clothing', icon: { prefix: 'la', name: 'tshirt' } }).format(),
    new Category({ title: 'Home repair', icon: { prefix: 'la', name: 'brush' } }).format(),
    new Category({ title: 'Bills', icon: { prefix: 'la', name: 'money-check-alt' } }).format(),
    new Category({ title: 'Charity', icon: { prefix: 'la', name: 'hand-holding-usd', }, active: false }).format(),
    new Category({ title: 'Healthcare', icon: { prefix: 'la', name: 'ambulance' } }).format(),
    new Category({ title: 'Gifts', icon: { prefix: 'la', name: 'gifts' } }).format(),
    new Category({ title: 'Smoking', icon: { prefix: 'la', name: 'smoking' } }).format(),
    new Category({ title: 'Sports', icon: { prefix: 'la', name: 'swimmer' } }).format(),
    new Category({ title: 'Household', icon: { prefix: 'la', name: 'couch' } }).format(),
    new Category({ title: 'Traveling', icon: { prefix: 'la', name: 'globe' } }).format(),
    new Category({ title: 'Pets', icon: { prefix: 'la', name: 'paw' } }).format(),
    new Category({ title: 'Shopping', icon: { prefix: 'la', name: 'shopping-cart' } }).format(),
    new Category({ title: 'Salary', icon: { prefix: 'la', name: 'wallet' }, type: 'income' }).format(),
    new Category({ title: 'Donation', icon: { prefix: 'la', name: 'donate', }, active: false, type: 'income' }).format(),
    new Category({ title: 'Savings', icon: { prefix: 'la', name: 'piggy-bank' }, type: 'income' }).format(),
    new Category({ title: 'Rental', icon: { prefix: 'la', name: 'home' }, type: 'income' }).format(),
]
