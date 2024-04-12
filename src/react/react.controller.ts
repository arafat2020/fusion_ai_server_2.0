import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/auth/auth.pipe';
import { ReactDTO } from './react.dto';
import { ReactService } from './react.service';

@Controller('react')
export class ReactController {
    constructor(private reactService: ReactService) { }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    react(@Body(new ValidationPipe) credential: ReactDTO, @Request() req) {
        return this.reactService.react({
            artID: credential.artId,
            type: credential.type,
            user: req.user
        })
    }

}
