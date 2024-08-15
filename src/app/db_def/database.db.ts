import { JsonSQLite } from '@capacitor-community/sqlite';

export const DB_NAME = `spendingswallet`;

export const DATABASE: JsonSQLite = {
    database: DB_NAME,
    version: 1,
    encrypted: false,
    mode: 'no-encryption',
    tables: []
};
