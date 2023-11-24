import { Injectable } from '@nestjs/common';
import { AtividadeDto } from './dto/create-atividade.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AtividadeService {
  constructor(private prisma:PrismaService) {}

  async create(atiAtividadeDto:AtividadeDto ){
      const data = {
          ...atiAtividadeDto,
      };

      const atividade = await this.prisma.atividade.create({data,})

      return {...atividade,}
  }
  async findAll() {
      return this.prisma.atividade.findMany();
  }
}
