import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class CredsService {

    async passwordHash(password: string): Promise<string> {
        return await bcrypt.hash("asddfasdasd" + password, 10);
    }
}
