import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CreateService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async create({
        name,
        user
    }: {
        name: string,
        user: Artist
    }): Promise<{
        name: string;
        id: string;
    }> {
        try {
            return await this.prisma.artGroup.create({
                data: {
                    name: name,
                    artistId: user.id
                },
                select: {
                    id: true,
                    name: true,

                }
            })
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
