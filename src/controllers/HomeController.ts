import { Request, Response } from 'express';
import { HomeModel } from '../models/HomeModel';
import { LOGINDATA } from '../interfaces/Login-interface';
import bcrypt from 'bcrypt';
import { jwtEncoded } from "../utils/JwtToken-util";


export class HomeController {

    private readonly home_model: HomeModel;

    constructor(){
        this.home_model = new HomeModel();
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
    
            const token = jwtEncoded({ userId: data[0].cod_empleado });
            res.status(statusCode).json({ token });
        } catch (error) {
            console.error('Error al realizar el login', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        
        

    }
}
