import { Injectable } from '@angular/core';
import { DATABASE, DB_NAME } from '@app/db_def';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';

export enum ConnectionStatus {
    'disconnected',
    'connecting',
    'connected'
}

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private _sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
    private _connection!: SQLiteDBConnection;

    connected$: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.disconnected);

    constructor() {

    }

    async initDBConnection() {
        await this._sqlite.initWebStore();

        this.connected$.next(ConnectionStatus.connecting);
        this._connection = await this._sqlite.createConnection(
            DB_NAME,
            false,
            'no-encryption',
            1,
            false
        );

        // await CapacitorSQLite.deleteDatabase({ database: DATABASE.database });

        await this._connection.open();
        await this._initDB();
        this.connected$.next(ConnectionStatus.connected);
    }

    private async _initDB() {
        await this._sqlite.importFromJson(JSON.stringify(DATABASE));
        const res = await this.db.query(`SELECT * FROM sqlite_master;`);
        console.log(`tables`, res);
    }

    get sqlite() {
        return this._sqlite;
    }

    get db() {
        return this._connection;
    }

    async select(query: string) {
        return await this._connection.query(query);
    }
}
