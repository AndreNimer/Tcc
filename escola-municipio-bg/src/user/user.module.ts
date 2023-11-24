import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MateriaModule } from 'src/materia/materia.module';

@Module({
  imports:[PrismaModule, MateriaModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],

})
export class UserModule {}
