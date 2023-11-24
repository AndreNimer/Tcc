import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TurmaDto } from './dto/create-turma.dto';


@Injectable()
export class TurmaService {
  constructor(private prisma:PrismaService) {}

  async createTurma(turmaDto: TurmaDto ){
      const data = {
        ...turmaDto
      };

      const turma = await this.prisma.turma.create({data,})

      return {...turma,}
  }
  async findAll() {
    return this.prisma.turma.findMany();
}
}
