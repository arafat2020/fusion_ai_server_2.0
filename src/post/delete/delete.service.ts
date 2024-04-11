import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Art, Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { LibService } from 'src/lib/lib.service';

@Injectable()
export class DeleteService {
    constructor(
        private prisma: DbService,
        private lib:LibService
    ) {
        this.prisma.init()
    }

    async isExist(id: string, user: Artist): Promise<Art> {
        const art = this.prisma.art.findUnique({
            where: {
                id,
                artistId: user.id
            }
        })
        if (!art) throw new HttpException('Art not found or invalid Obj ID', HttpStatus.BAD_REQUEST)
        return art
    }

    async delete({ id, user }: { id: string, user: Artist }) {
        const art = await this.isExist(id, user)
        try {
            await this.prisma.art.delete({
                where: {
                    id: art.id
                }
            })
            await this.lib.deleteImage(art.public_id)
            await this.lib.deleteImage(art.cmpPubLic_ID)
            return await this.prisma.art.findMany({
                where: {
                    artistId: `${user.id}`
                },
                select: {
                    id: true,
                    img: true,
                    width: true,
                    height: true,
                    react: true,
                }
            })
        } catch (error) {
            throw new HttpException('Art not found or invalid Obj ID', HttpStatus.BAD_REQUEST)
        }
    }
}
