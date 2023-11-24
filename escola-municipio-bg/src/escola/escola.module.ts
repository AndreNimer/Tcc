import { Module } from '@nestjs/common';
import { EscolaService } from './escola.service';
import { EscolaController } from './escola.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [EscolaController],
  providers: [EscolaService],
})
export class EscolaModule {}
