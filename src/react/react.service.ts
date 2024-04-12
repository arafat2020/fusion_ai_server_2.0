import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ReactService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async react({
        artID,
        type,
        user
    }: {
        artID: string,
        type: string,
        user: Artist
    }): Promise<{
        react: {
            type: string;
            id: string;
            artistId: string;
        }[];
        id: string;
        img: string;
        width: number;
        height: number;
        Artist: {
            id: string;
            profilePic: string;
        };
    }> {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const isReacted = await tx.react.findMany({
                    where: {
                        artistId: user.id,
                        artId: artID,
                    },
                });

                if (isReacted.length === 0) {
                    await tx.react.create({
                        data: {
                            id: `${this.prisma.getObjID()}`,
                            artId: artID,
                            artistId: user.id,
                            type: type ? type : 'like',
                        },
                    });
                } else {
                    if (isReacted[0].type === type) {
                        await tx.react.delete({
                            where: {
                                id: isReacted[0].id,
                            },
                        });
                    } else {
                        await tx.react.update({
                            where: {
                                id: isReacted[0].id,
                            },
                            data: {
                                type: type,
                            },
                        });
                    }
                }

                const art = await tx.art.findUnique({
                    where: {
                        id: artID,
                    },
                    select: {
                        id: true,
                        img: true,
                        height: true,
                        width: true,
                        Artist: {
                            select: {
                                id: true,
                                profilePic: true,
                            },
                        },
                        react: {
                            select: {
                                id: true,
                                type: true,
                                artistId: true,
                            },
                        },
                    },
                });

                return art;
            },
                {
                    maxWait: 10000,
                    timeout: 15000
                })
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
