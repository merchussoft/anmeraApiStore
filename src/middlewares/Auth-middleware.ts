import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authJwtValidate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header('Authorization');

    if (!authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado o inválido' });
        return;
    }

    const token = authHeader.replace('Bearer ', '').trim();

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded_token;
        
        // ✅ Llamar a next() correctamente
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};