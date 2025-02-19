import * as jwt from 'jsonwebtoken';
import { TokenModel } from '../models/TokenModel';


export class JwtToken {

    private readonly tokenModel: TokenModel;

    constructor() {
        this.tokenModel = new TokenModel();
    }

    async jwtEncoded(data:any = {}) {
        try {
            const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' })
            const { token_insert } = await this.tokenModel.insertToken({cod_operador: data.userId, token})
            return token_insert;
        } catch (e) {
            console.log('Error al crear el token ', e)
        }
    }
}

