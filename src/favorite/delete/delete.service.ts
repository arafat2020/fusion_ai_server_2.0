import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class DeleteService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async delete({
        artID,
        favoriteID,
        user
    }: {
        favoriteID: string,
        artID: string,
        user: Artist
    }): Promise<{
        id: string;
        artId: string;
        artistId: string;
    }[]> {
       try {
        return this.prisma.$transaction(async (prisma) => {
            await prisma.favourite.delete({
                where: {
                    id: favoriteID,
                    artistId: user.id
                }
            })
            const res = await prisma.favourite.findMany({
                where: {
                    artId: `${artID}`
                }, select: {
                    id: true,
                    artId: true,
                    artistId: true
                }
            })
            return res
        }, {
            maxWait: 10000,
            timeout: 15000
        })
       } catch (error) {
        throw new HttpException(error,HttpStatus.BAD_REQUEST)
       }
    }
}
