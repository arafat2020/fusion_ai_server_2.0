import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UpdateService {
    constructor(private prima: DbService) {
        this.prima.init()
    }

    async update({
        cmtID,
        comment,
        user
    }: {
        cmtID: string,
        comment: string,
        user:Artist
    }): Promise<{
        id: string;
        commet: string;
        date: Date;
        Artist: {
            id: string;
            name: string;
            profilePic: string;
        };
    }> {
        try {
            return await this.prima.comment.update({
                where: {
                    id: cmtID,
                    artistId:user.id
                }, data: {
                    commet: comment
                },
                select: {
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
