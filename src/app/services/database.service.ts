import { Injectable } from '@angular/core';
import { AccountEntity, CategoryEntity } from '@app/entities';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';
import { DataSource } from 'typeorm';

export enum ConnectionStatus {
    'disconnected',
    'connecting',
    'connected'
}

export const DB_NAME = `spendingswallet`;

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private _sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

    private _dataSource: DataSource | null = null;

    connected$: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.disconnected);

    constructor() {}

    async initDBConnection() {
        await this._sqlite.initWebStore();

        this.connected$.next(ConnectionStatus.connecting);
        this._dataSource = new DataSource({
            type: 'capacitor',
            database: DB_NAME,
            driver: this._sqlite,
            entities: [
                AccountEntity,
                CategoryEntity,
            ],
            logging: ['error'],
            dropSchema: environment.production, //TODO: <-- remove for production
            migrationsTableName: 'migrations',
        });

        this._dataSource = await this._dataSource.initialize();

        await this._dataSource.synchronize(true);

        this.connected$.next(ConnectionStatus.connected);
    }

    get dataSource() {
        return this._dataSource;
    }
}
