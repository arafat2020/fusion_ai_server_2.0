import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class RemoveService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async removeFromFroup({
        id,
        artGroupID
    }: {
        id: string,
        artGroupID: string
    }): Promise<{
        id: string;
        name: string;
    }> {
        try {
            const dl = await this.prisma.$transaction(async prisma => {
                const isExist = await prisma.group.findUnique({
                    where: {
                        id: id,
                        artGroupId: artGroupID
                    }
                })
                if (isExist?.id) {
                    await prisma.group.delete({
                        where: {
                            id: id
                        }
                    })
                    const artGroup = await prisma.artGroup.findUnique({
                        where: {
                            id: artGroupID
                        },
                        select: {
                            id: true,
                            name: true
                        }
                    })
                    return artGroup
                }
            })
            return dl
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
