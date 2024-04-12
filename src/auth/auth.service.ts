import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { LibService } from 'src/lib/lib.service';

@Injectable()
export class AuthService {
     constructor(
        private prisma: DbService,
        private lib: LibService,
        private jwt: JwtService,
        private config: ConfigService
    ) {
        this.prisma.init()
    }

    async signUp({
        name,
        about,
        email,
        password,
        imgUrl
    }:
        {
            name: string,
            email: string,
            password: string,
            about: string,
            imgUrl: string
        }): Promise<{ artist: Artist, access_token: string }> {
        const img = await this.lib.cldUpload(imgUrl)
        try {
            const artist = await this.prisma.artist.create({
                data: {
                    id: this.prisma.getObjID(),
                    about: about,
                    email: email,
                    name: name,
                    password: await this.lib.hashed(password),
                    profilePic: img.url,
                    joinedAt: new Date().toISOString()
                }
            })
            return {
                artist,
                access_token: await this.jwt.signAsync(artist, {
                    secret: this.config.get('JWT_SECRET'),
                    expiresIn: '7d'
                })
            }
        } catch (error) {
            this.lib.deleteImage
            throw new HttpException({
                err: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async signIn({
        email,
        password
    }: {
        email: string,
        password: string
    }): Promise<{ artist: Artist, access_token: string }> {
        try {
            const user = await this.prisma.artist.findUnique({
                where: {
                    email: email
                }
            })
            if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
            const isVarified = await this.lib.verifyHash(password, user.password)
            if (!isVarified) throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED)
            return {
                artist: user,
                access_token: await this.jwt.signAsync(user, {
                    secret: this.config.get('JWT_SECRET'),
                    expiresIn: '7d'
                })
            }
        } catch (error) {
            console.log(error);
            
            throw new HttpException({
                err: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

}
