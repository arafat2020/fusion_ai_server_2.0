import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class GetService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async get({
        skip = 0,
        user
    }: {
        skip: number,
        user: Artist
    }): Promise<{
        id: string;
        artistId: string;
        Art: {
            id: string;
            Artist: {
                id: string;
                name: string;
                profilePic: string;
            };
            img: string;
            react: {
                id: string;
                type: string;
            }[];
        };
    }[]
    > {
        try {
            return await this.prisma.favourite.findMany({
                where: {
                    artistId: user.id
                }, select: {
                    id: true,
                    artistId: true,
                    Art: {
                        select: {
                            id: true,
                            img: true,
                            react: {
                                select: {
                                    id: true,
                                    type: true
                                }
                            },
                            Artist: {
                                select: {
                                    id: true,
                                    name: true,
                                    profilePic: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    id: 'desc'
                },
                skip: skip
            })

        } catch (error) {

        }
    }
}
