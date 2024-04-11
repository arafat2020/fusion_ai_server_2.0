import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as cloudinary from 'cloudinary';
import axios from "axios";
import sharp from "sharp";


@Injectable()
export class LibService {
    constructor(private config:ConfigService){}

    encrypt:bcrypt

    async hashed(plainPassword:string) {
        return await this.encrypt.hash(plainPassword, 10).then(async hash => {
            return await hash
        })
    }

    async verifyHash(plainPassword:string,hashedPassword:string) {
        return await this.encrypt.compare(plainPassword, hashedPassword).then(async (result) => {
            return await result
        });
    }
    // _______________Cld Start_______________
    cldInitiate() {
        cloudinary.v2.config({
            cloud_name: this.config.get('CLOUDINARY_NAME'),
            api_key: this.config.get('CLOUDINARY_API_KEY'),
            api_secret: this.config.get('CLOUDINARY_API_SECRET')
        });
    }

    async cldUpload(url: string): Promise<{
        url: string,
        width: number,
        height: number,
        public_id:string
    }> {
        await this.cldInitiate();
        try {
            const Cls = await cloudinary.v2.uploader.upload(url);
            const data = {
                url: Cls.url,
                width: Cls.width,
                height: Cls.height,
                public_id:Cls.public_id
            };
            return data;
        } catch (error) {
            throw new HttpException({
                msg: 'Something Went Wrong or invalid img url or string',
                obj: error
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteImage(public_id:string) {
        await this.cldInitiate()
        await cloudinary.v2.uploader.destroy(public_id,res=>{
            console.log('delete',res);
        })
    }
    // _______________Cld End_______________
     // _______________Sherp Start_______________
     async uploadWithSharp(url: string): Promise<{
        isSuccess: boolean,
        url: string | 'NOT_FOUND' | 'FAILED'
        public_id:string|null
    }> {
        try {
            const imgBuffer = await axios.get(url, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(imgBuffer.data, 'binary');
            const data = await sharp(imageBuffer).png({ quality: 20 }).toBuffer();
            const base64String = data.toString('base64');
            const cld = await this.cldUpload(`data:image/png;base64,${base64String}`);
            if (cld && cld.url) {
                return {
                    isSuccess: true,
                    url: cld.url,
                    public_id:cld.public_id
                };
            } else {
                throw new HttpException('Something went wron',HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                error
            },HttpStatus.BAD_REQUEST)
        }
    }

    // _______________Sherp End_______________
}
