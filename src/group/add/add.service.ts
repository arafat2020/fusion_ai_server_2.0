import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { uuid } from 'uuidv4';

@Injectable()
export class AddService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async isExist(artID: string, artGroupID: string) {
        const isExist = await this.prisma.group.findMany({
            where: {
                artId: artID,
                artGroupId: artGroupID
            }
        })
        if (isExist.length > 0) {
            if (isExist.length > 1) {
                await this.prisma.group.delete({
                    where: {
                        id: isExist[0].id
                    }
                })
            }
            throw new HttpException('Already added', HttpStatus.BAD_REQUEST)
        }
    }

    async add({
        artGroupID,
        artID
    }: {
        artID: string,
        artGroupID: string,
    }): Promise<{
        ArtGroup: {
            id: string;
            Group: {
                id: string;
                artId: string;
            }[];
            name: string;
        };
    }> {
        try {
            await this.isExist(artID, artGroupID)
            const artGroup = await this.prisma.group.create({
                data: {
                    id: this.prisma.getObjID(),
                    artId: artID,
                    artGroupId: artGroupID,
                    uuid: uuid()
                }, select: {
                    ArtGroup: {
                        select: {
                            id: true,
                            name: true,
                            Group: {
                                where: {
                                    id: this.prisma.getObjID()
                                }, select: {
                                    id: true,
                                    artId: true
                                }
                            }
                        }
                    }
                }

            })
            return artGroup
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
