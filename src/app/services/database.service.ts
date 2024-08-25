import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import * as entities from '@app/entities';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';
import { DataSource } from 'typeorm';
import localforage from 'localforage';

export enum ConnectionStatus {
    'disconnected',
    'connecting',
    'connected'
}

export const DB_NAME = `spendings-wallet`;

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private _sqlite: SQLiteConnection;

    private _dataSource: DataSource | null = null;

    connected$: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.disconnected);

    constructor() { }

    async initDBConnection() {
        if (Capacitor.getPlatform() === 'web')
            await this._sqlite.initWebStore();

        // CapacitorSQLite.deleteDatabase({ database: DB_NAME });
        this._sqlite = new SQLiteConnection(CapacitorSQLite);
        // let result: boolean = false;

        const { result } = await CapacitorSQLite.checkConnectionsConsistency({ dbNames: [], openModes: ['RW', 'RO'] });

        if (result)
            await this._sqlite.closeAllConnections();

        if (!result) {
            this.connected$.next(ConnectionStatus.connecting);
            this._dataSource = new DataSource({
                type: 'capacitor',
                database: DB_NAME,
                driver: this._sqlite,
                mode: 'no-encryption',
                entities,
                logging: [
                    'migration',
                    'query',
                    'schema',
                    'log',
                    'info',
                    'warn',
                    'error',
                ],
                // synchronize: true,
                // dropSchema: true,
                migrationsRun: true,
                migrationsTableName: 'migrations',
            });

            this._dataSource = await this._dataSource.initialize();

            // await this._dataSource.synchronize(true);

            // await this._sqlite.saveToStore(DB_NAME);
        }

        this.connected$.next(ConnectionStatus.connected);
    }

    get dataSource() {
        return this._dataSource;
    }

    async disconnectDB() {
        console.log(`Disconnecting from DB...`);
        await this._dataSource.destroy();
        await this._sqlite.closeAllConnections();
        console.log(`Disconnected from DB!`);
    }

    async exportDb(): Promise<void> {
        if (Capacitor.getPlatform() !== 'web') return;
        console.log(`Exporting database...`);
        // await this._sqlite.saveToLocalDisk(DB_NAME);
        // return;
        // await this.flush();
        const db = localforage.createInstance({ name: 'jeepSqliteStore', storeName: 'databases' });
        console.log(`localforage.createInstance`, db);
        const data = await db.getItem<Uint8Array>(`${DB_NAME}SQLite.db`);
        console.log(`db.getItem`, data);
        if (!data) return;

        this._initiateDownload(`${DB_NAME}SQLite.db`, 'application/vnd.sqlite3', data); //'application/octet-stream' works fine too
    }

    private _initiateDownload(filename: string, dataType: string, data: BlobPart) {
        const blob = new Blob([data], { type: dataType });
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    }
}
