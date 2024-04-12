import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class DeleteService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async delete({
        cmtID,
        user
    }: {
        cmtID: string,
        user: Artist
    }): Promise<{
        id: string;
        commet: string;
        date: Date;
        artId: string;
        artistId: string;
    }> {
      try {
        return await this.prisma.comment.delete({
            where: {
                id: cmtID,
                artistId:user.id
            }
        })
      } catch (error) {
        throw new HttpException({
            err: error
        }, HttpStatus.BAD_REQUEST)
      }
    }
}
