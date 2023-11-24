import { Module } from '@nestjs/common';
import { ComunicadoService } from './comunicado.service';
import { ComunicadoController } from './comunicado.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ComunicadoController],
  providers: [ComunicadoService],
})
export class ComunicadoModule {}
