import { DatabaseConfig } from "../config/db";
import { DATAINSERTTOKEN } from "../interfaces/DataInsertToken-interface";

export class TokenModel {

    private readonly db: DatabaseConfig;

    constructor() {
        this.db = new DatabaseConfig();
    }

    async insertToken(data:DATAINSERTTOKEN) {
        const sql_insert = `INSERT INTO ${process.env.DB_NAME_BASEADMIN}.sessions(cod_operador, token)VALUES(?, ?)`;
        const { data: { insertId }} = await this.db.resultPromise(sql_insert, [data.cod_operador, data.token]);
        return { token_insert: data.token, id_insert: insertId }
    }

    async deleteToken(token: string) {
        const sql_delete = `DELETE FROM ${process.env.DB_NAME_BASEADMIN}.sessions WHERE token = ?`;
        const result = await this.db.resultPromise(sql_delete, [ token ]);
        console.log('mirando si se elimino esto ', result);
    }

    async updateToken(token: string) {
        const sql_update = `UPDATE ${process.env.DB_NAME_BASEADMIN}.sessions SET activo=? WHERE token=?`;
        const respnse = await this.db.resultPromise(sql_update, [0, token]);
        console.log(respnse);
    }

    async viewToken(token: string) {
        const sql = `SELECT COUNT(cod_session) as session FROM ${process.env.DB_NAME_BASEADMIN}.sessions WHERE token = ? AND activo = ?`;
        return await this.db.resultPromise(sql, [ token, 1 ]);
    }
}