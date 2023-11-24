import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ComunicadoDto } from './dto/create-comunicado.dto';


@Injectable()
export class ComunicadoService {
  constructor(private prisma:PrismaService) {}

    async create(comunicadoDto: ComunicadoDto ){
        const data = {
            ...comunicadoDto,
        };
        const comunicado = await this.prisma.comunicado.create({data})
    
        return {...comunicado}
    }

    async findAll() {
        return this.prisma.comunicado.findMany();
    }
}
