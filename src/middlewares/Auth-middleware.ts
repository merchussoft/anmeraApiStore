import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { TokenModel } from '../models/TokenModel';

const tokenModel = new TokenModel(); // Instancia de TokenModel

export const authJwtValidate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = tokenRequest(req)
        if(!token){
            res.status(401).json({ message: 'Token no proporcionado o inválido' });
            return;
        }

        // Verificar si el token existe en la base de datos y está activo
        const { data } = await tokenModel.viewToken(token);
        if(!data[0].session) {
            res.status(401).json({ message: 'Token inválido o sesión expirada' });
            return;
        }
    
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded_token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export const tokenRequest = (req: Request): string | null => {
    const authHeader = req.header('Authorization');

    if(!authHeader) return null;
    if (!authHeader.startsWith('Bearer ')) return null;

    return authHeader.replace('Bearer ', '').trim();
}