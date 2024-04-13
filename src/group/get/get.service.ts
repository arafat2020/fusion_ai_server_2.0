import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class GetService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async get({
        artGroupID
    }: {
        artGroupID: string
    }): Promise<{
        id: string;
        name: string;
        artistId: string;
        published: boolean;
    }> {
        try {
            const group = await this.prisma.artGroup.findUnique({
                where: {
                    id: artGroupID
                },

            })
            return group
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async getForFeed(): Promise<{
        id: string;
        name: string;
        published: boolean;
        Artist: {
            id: string;
            name: string;
            profilePic: string;
        };
        Group: {
            id: string;
            Art: {
                id: string;
                Artist: {
                    id: string;
                    name: string;
                    profilePic: string;
                };
                react: {
                    id: string
                    type: string
                }[];
                img: string;
                tag: string;
                cmp: string;
            };
        }[];
    }[]
    > {
        try {
            const data = await this.prisma.artGroup.findMany({
                where: {
                    published: true
                },
                take: 9,
                orderBy: {
                    Group: {
                        _count: "asc"
                    }
                }, select: {
                    id: true,
                    name: true,
                    published: true,
                    Artist: {
                        select: {
                            id: true,
                            name: true,
                            profilePic: true
                        }
                    },
                    Group: {
                        select: {
                            id: true,
                            Art: {
                                select: {
                                    id: true,
                                    img: true,
                                    cmp: true,
                                    tag: true,
                                    Artist: {
                                        select: {
                                            id: true,
                                            name: true,
                                            profilePic: true
                                        }
                                    },
                                    react: {
                                        select: {
                                            id: true,
                                            type: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: {
                            id: 'desc'
                        }
                    }
                }
            })
            return data
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
