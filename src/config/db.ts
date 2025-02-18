import mysql from 'mysql2/promise';
import { Config } from './config';
import { queryResult } from '../utils/Response-util';
import { QUERYRESPONSE } from '../interfaces/MysqlConfig-interface';

export class DatabaseConfig extends Config {

    private readonly pool: mysql.Pool;

    constructor() {
        super()
        this.pool = this.createPoolDb();
    }

    private createPoolDb() {
        return mysql.createPool(this.mysqlDataConex());
    }

    async resultPromise(sql: string, data: any[] = []): Promise<any> {
        try {
            const [ rows ] = await this.pool.execute(sql, data);
            return queryResult(rows)
        } catch (e) {
            console.log('mirando este error ', e);
            return queryResult([], 'Error al ejecutar la consulta', 403)
        }
    }
}