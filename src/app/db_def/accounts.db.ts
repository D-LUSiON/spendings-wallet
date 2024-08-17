import { Account } from '@app/shared/classes';

export const DB_ACCOUNTS_DEFAULT = [
    new Account({ title: 'Cash' }),
    new Account({ title: 'Bank account 1' }),
    new Account({ title: 'Bank account 2' }),
    new Account({ title: 'Credit card' }),
    new Account({ title: 'PayPal', active: false }),
    new Account({ title: 'Savings' }),
]
