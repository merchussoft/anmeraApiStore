import { Request, Response } from 'express';
import { HomeModel } from '../models/HomeModel';
import { LOGINDATA } from '../interfaces/Login-interface';
import bcrypt from 'bcrypt';
import { JwtToken } from "../utils/JwtToken-util";
import { tokenRequest } from '../middlewares/Auth-middleware';


export class HomeController {

    private readonly home_model: HomeModel;
    private readonly jwt_token: JwtToken;

    constructor(){
        this.home_model = new HomeModel();
        this.jwt_token = new JwtToken();
    }

    async getHome(req: Request, res: Response) {
        const result = await this.home_model.getUsers();
        console.log(result);
        res.status(200).json(result);
    }

    async getlogin(req: Request, res: Response){

        const { usuario, password }:LOGINDATA = req.body;
        try {
            const { statusCode, data } = await this.home_model.login({ usuario, password });
    
            if (!data.length) return res.status(statusCode).json({ message: 'El usuario es incorrecto' });
    
            const password_match = await bcrypt.compare(password, data[0].contrasena);
            if (!password_match) return res.status(403).json({ message: 'La contraseña es incorrecta' });
    
            const token = await this.jwt_token.jwtEncoded({ userId: data[0].cod_empleado });
            res.status(statusCode).json({ token });
        } catch (error) {
            console.error('Error al realizar el login', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async logout(req: Request, res: Response) {
        const token = await tokenRequest(req);
        if(!token){
            res.status(401).json({ message: 'Token no proporcionado o inválido' });
            return;
        }

        
    }
}
