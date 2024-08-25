import { Injectable } from '@angular/core';
import { Category } from '@app/shared/classes';
import { BehaviorSubject } from 'rxjs';
import { ConnectionStatus, DatabaseService } from './database.service';
import { DB_CATEGORIES_DEFAULT } from '@app/db_def';
import { CategoryEntity } from '@app/entities';
import { Repository } from 'typeorm';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private _categoriesRepository: Repository<CategoryEntity>;

    private _categories: Category[] = [];

    categories$: BehaviorSubject<Category[]> = new BehaviorSubject(this.categories);

    constructor(
        private _database: DatabaseService,
    ) {
        this._database.connected$.subscribe(async (status) => {
            if (status === ConnectionStatus.connected) {
                this._categoriesRepository = _database.dataSource.getRepository(CategoryEntity);
                await this._init();
            }
        });
    }

    private async _init() {
        this._categories = await this.getAll();
        if (this._categories.length === 0) {
            await this._insertDefaultCategories(DB_CATEGORIES_DEFAULT);
            this._categories = await this.getAll();
        }
        this.categories$.next(this._categories);
    }

    get categories() {
        return [...this._categories];
    }

    async getAll() {
        const entities = await this._categoriesRepository.find();
        const categories: Category[] = [];
        entities.forEach(entity => {
            const category = new Category(entity);
            categories.push(category);
        });
        return categories;
    }

    private async _insertDefaultCategories(categories: Category[]) {
        const entities = [];
        categories.forEach(category => {
            entities.push(this._createEntity(category));
        });

        await this._categoriesRepository.insert(entities);
    }

    private _createEntity(category: Category): CategoryEntity {
        const catEntity = new CategoryEntity();
        catEntity.id = category.id;
        catEntity.title = category.title;
        catEntity.icon = category.icon;
        catEntity.active = category.active;
        catEntity.type = category.type;
        return catEntity;
    }

    async createOrUpdateCategory(category: Category) {
        let catEntity = this._createEntity(category);
        catEntity = await this._categoriesRepository.save(catEntity);
        category = new Category(catEntity);

        const category_idx = this._categories.findIndex(x => x.id === category.id);
        if (category_idx > -1)
            this._categories[category_idx] = category;
        else {
            if (!category.id)
                category.id = this._categories.length ? this._categories[this._categories.length - 1].id + 1 : 1;
            this._categories.push(category);
        }
        this.categories$.next(this.categories);
    }

    async removeCategory(category: Category) {
        await this._categoriesRepository.delete({ id: category.id });

        this._categories = this._categories.filter(x => x.id !== category.id);
        this.categories$.next(this.categories);
    }

}
