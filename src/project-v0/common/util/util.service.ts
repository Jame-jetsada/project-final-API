import { Injectable } from '@nestjs/common';
import { KEY } from 'src/config/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UtilService {
    async getHash(password: String | undefined): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async compareHash(password: String, hash: String): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
    async signToken(data: any): Promise<String> {
        const secretKey = KEY.jwt.secretKey;
        const token = jwt.sign(data, secretKey, {});
        return token;
    }

    async verifyToken(token): Promise<any> {
        const secretKey = KEY.jwt.secretKey;
        const decoded: any = jwt.verify(
            token,
            secretKey,
        );
        return decoded;
    }


}
