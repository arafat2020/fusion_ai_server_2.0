import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AddService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async add({
        artID,
        user
    }: {
        artID: string,
        user: Artist
    }): Promise<{
        id: string;
        artId: string;
        artistId: string;
    }> {
        try {
            return await this.prisma.favourite.create({
                data: {
                    id: `${this.prisma.getObjID()}`,
                    artId: `${artID}`,
                    artistId: `${user.id}`
                }, select: {
                    id: true,
                    artId: true,
                    artistId: true
                }
            })
        } catch (error) {
            throw new HttpException(error,HttpStatus.BAD_REQUEST)
        }
    }
}
