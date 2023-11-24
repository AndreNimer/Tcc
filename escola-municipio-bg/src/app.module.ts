import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EscolaModule } from './escola/escola.module';
import { MateriaModule } from './materia/materia.module';
import { TurmaModule } from './turma/turma.module';
import { ChatModule } from './chat/chat.module';
import { ComunicadoModule } from './comunicado/comunicado.module';
import { AtividadeModule } from './atividade/atividade.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, EscolaModule, MateriaModule, TurmaModule, ChatModule, ComunicadoModule, AtividadeModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
