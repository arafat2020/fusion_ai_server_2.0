import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';


@Injectable()
export class DbService extends PrismaClient {
    constructor() {
        super()
    }

    getObjID() {
        return new ObjectId() as unknown as string
    }

    async init() {
        try {
         await this.$connect()
        } catch (error) {
            throw new HttpException({
                msg:"something went wrong",
                obj:error
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
