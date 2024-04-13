import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class DeleteService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async delete({
        id,
        user
    }: {
        id: string,
        user: Artist
    }): Promise<{
        id: string;
        name: string;
        artistId: string;
        published: boolean;
    }> {
        try {
            const dl = await this.prisma.artGroup.delete({
                where: {
                    id: id,
                    artistId: user.id
                }
            })
            return dl
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
