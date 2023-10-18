import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class CredsService {

    async passwordHash(password: string): Promise<string> {
        return await bcrypt.hash("asddfasdasd" + password, 10);
    }

    async passwordMatch(password:string,hashed):Promise<boolean>{
        return await bcrypt.compare("asddfasdasd" + password,hashed)
    }

    async generateVerifyCode() {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
