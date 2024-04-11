import { Module,Global} from '@nestjs/common';
import { LibService } from './lib.service';
import { ConfigService } from '@nestjs/config';


@Module({
  providers: [LibService,ConfigService],
  exports:[LibService]
})

@Global()
export class LibModule {}
