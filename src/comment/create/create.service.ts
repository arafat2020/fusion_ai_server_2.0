import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CreateService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async cerate({
        artID,
        comment,
        user
    }: {
        artID: string,
        comment: string,
        user: Artist
    }): Promise<{
        id: string;
        Artist: {
            id: string;
            name: string;
            profilePic: string;
        };
        commet: string;
        date: Date;
    }> {
        try {
            return await this.prisma.comment.create({
                data: {
                    id: `${this.prisma.getObjID()}`,
                    artId: artID,
                    artistId: user.id,
                    commet: comment
                }, select: {
                    id: true,
                    commet: true,
                    date: true,
                    Artist: {
                        select: {
                            id: true,
                            profilePic: true,
                            name: true
                        }
                    }
                }
            })
        } catch (error) {
            throw new HttpException({
                err: error
            }, HttpStatus.BAD_REQUEST)
        }
    }
}
