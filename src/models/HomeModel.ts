import { DatabaseConfig } from "../config/db";
import { LOGINDATA } from "../interfaces/Login-interface";
import { QUERYRESPONSE } from "../interfaces/MysqlConfig-interface";


export class HomeModel {

    private db: DatabaseConfig;

    constructor() {
        this.db = new DatabaseConfig();
    }

    async getUsers() {
        const sql = `SELECT cod_empleado, usuario, e.nombre, email, p.nombre as perfil  FROM ${process.env.DB_NAME_BASEADMIN}.empleados e INNER JOIN ${process.env.DB_NAME_BASEADMIN}.perfiles p ON p.cod_perfil = e.cod_perfil`; 
        return await this.db.resultPromise(sql); 
    }

    async login( data_login:LOGINDATA) {

        const {usuario, password}:LOGINDATA = data_login;

        try {
            let sql_usuario = `SELECT COUNT(cod_empleado) as count, password as contrasena, cod_empleado FROM ${process.env.DB_NAME_BASEADMIN}.empleados WHERE usuario=? GROUP BY cod_empleado`;
            const {statusCode, data }:QUERYRESPONSE = await this.db.resultPromise(sql_usuario, [usuario]);

            return {statusCode, data }
            
        } catch (error) {
            
        }

        
        

    }
}