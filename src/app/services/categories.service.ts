import { Injectable } from '@angular/core';
import { Category } from '@app/shared/classes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private _categories: Category[] = [
        new Category({
            id: 1,
            title: 'Gasoline',
            icon: {
                prefix: 'la',
                name: 'gas-pump',
            },
        }),
        new Category({
            id: 2,
            title: 'Toys',
            icon: {
                prefix: 'la',
                name: 'robot',
            },
        }),
        new Category({
            id: 3,
            title: 'Clothing',
            icon: {
                prefix: 'la',
                name: 'tshirt',
            },
        }),
        new Category({
            id: 4,
            title: 'Home repair',
            icon: {
                prefix: 'la',
                name: 'brush',
            },
        }),
        new Category({
            id: 5,
            title: 'Bills',
            icon: {
                prefix: 'la',
                name: 'money-check-alt',
            },
        }),
        new Category({
            id: 6,
            title: 'Charity',
            icon: {
                prefix: 'la',
                name: 'hand-holding-usd',
            },
            active: false
        }),
        new Category({
            id: 7,
            title: 'Healthcare',
            icon: {
                prefix: 'la',
                name: 'ambulance',
            },
        }),
        new Category({
            id: 8,
            title: 'Gifts',
            icon: {
                prefix: 'la',
                name: 'gifts',
            },
        }),
        new Category({
            id: 9,
            title: 'Smoking',
            icon: {
                prefix: 'la',
                name: 'smoking',
            },
        }),
        new Category({
            id: 10,
            title: 'Sports',
            icon: {
                prefix: 'la',
                name: 'swimmer',
            },
        }),
        new Category({
            id: 11,
            title: 'Household',
            icon: {
                prefix: 'la',
                name: 'couch',
            },
        }),
        new Category({
            id: 12,
            title: 'Traveling',
            icon: {
                prefix: 'la',
                name: 'globe',
            },
        }),
        new Category({
            id: 13,
            title: 'Pets',
            icon: {
                prefix: 'la',
                name: 'paw',
            },
        }),
        new Category({
            id: 14,
            title: 'Shopping',
            icon: {
                prefix: 'la',
                name: 'shopping-cart',
            },
        }),
        new Category({
            id: 15,
            title: 'Salary',
            icon: {
                prefix: 'la',
                name: 'wallet',
            },
            type: 'income'
        }),
        new Category({
            id: 16,
            title: 'Donation',
            icon: {
                prefix: 'la',
                name: 'donate',
            },
            active: false,
            type: 'income'
        }),
        new Category({
            id: 17,
            title: 'Savings',
            icon: {
                prefix: 'la',
                name: 'piggy-bank',
            },
            type: 'income'
        }),
        new Category({
            id: 18,
            title: 'Rental',
            icon: {
                prefix: 'la',
                name: 'home',
            },
            type: 'income'
        }),
    ];

    categories$: BehaviorSubject<Category[]> = new BehaviorSubject(this.categories);

    constructor() { }

    get categories() {
        return [...this._categories];
    }

    async createOrUpdateCategory(category) {
        const category_idx = this._categories.findIndex(x => x.id === category.id);
        if (category_idx > -1)
            this._categories[category_idx] = category;
        else {
            if (!category.id)
                category.id = this._categories.length ? this._categories[this._categories.length - 1].id + 1 : 1;
            this._categories.push(category);
            this.categories$.next(this.categories);
        }
    }

    async removeCategory(id: number) {

    }
}
