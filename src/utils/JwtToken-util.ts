import * as jwt from 'jsonwebtoken';

export const jwtEncoded = (data:{}) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' })
    } catch (e) {
        console.log('Error al crear el token ', e)
    }
}