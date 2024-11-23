import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class GetService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async getPostById({ id }: { id: string }) {
        try {
            return await this.prisma.$transaction([
                this.prisma.art.findUnique({
                    where: {
                        id: `${id}`
                    },
                    select: {
                        id: true,
                        img: true,
                        tag: true,
                        createdAt: true,
                        Artist: {
                            select: {
                                id: true,
                                profilePic: true
                            }
                        }
                    }
                }),
                this.prisma.comment.findMany({
                    where: {
                        artId: `${id}`
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
                    },
                    orderBy: {
                        id: 'desc'
                    }
                })
                ,
                this.prisma.react.count({
                    where: {
                        artId: `${id}`,
                        type: 'like'
                    }
                }),
                this.prisma.react.count({
                    where: {
                        artId: `${id}`,
                        type: 'love'
                    }
                }),
                this.prisma.react.count({
                    where: {
                        artId: `${id}`,
                        type: 'dislike'
                    }
                }),
                this.prisma.react.findMany({
                    where: {
                        artId: `${id}`
                    }
                }),
                this.prisma.react.findMany({
                    where: {
                        artId: `${id}`
                    },
                    select: {
                        id: true,
                        type: true,
                        artistId: true
                    }
                }),
                this.prisma.favourite.findMany({
                    where: {
                        artId: `${id}`
                    }, select: {
                        id: true,
                        artistId: true,
                        artId: true,
                    },
                    orderBy: {
                        id: 'desc'
                    }
                })
            ])
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async getPostForFeed({ skip }: { skip: number | undefined | string }) {
        try {
            return this.prisma.$transaction([
                this.prisma.art.findMany({
                    where: {
                        hide: {
                            not: true
                        }
                    }
                    , select: {
                        id: true,
                        img: true,
                        height: true,
                        width: true,
                        createdAt: true,
                        cmp: true,
                        Artist: {
                            select: {
                                id: true,
                                profilePic: true,
                                name: true
                            }
                        },
                        react: {
                            select: {
                                id: true,
                                type: true,
                                artistId: true
                            }
                        },
                        comment: {
                            take: 1
                            , select: {
                                id: true,
                                date: true,
                                commet: true,
                                Artist: {
                                    select: {
                                        id: true,
                                        profilePic: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        id: 'desc'
                    },
                    take: 20,
                    skip: skip ? (typeof skip === "string"? parseInt(skip, 10) : 0) : 0
                }),
                this.prisma.art.count({
                    where: {
                        hide: {
                            not: true
                        }
                    }
                })
            ])
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
