import { Module } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [MateriaController],
  providers: [MateriaService],
  exports:[MateriaService],
})
export class MateriaModule {}
