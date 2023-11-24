import { Injectable } from '@nestjs/common';
import { EscolaDto } from './dto/create-escola.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EscolaService {
    constructor(private prisma:PrismaService) {}

    async create(escolas: EscolaDto ){
        const data = {
            ...escolas,
        };
        const escola = await this.prisma.escola.create({data})
    
        return {...escola}
    }

    async findAll() {
        return this.prisma.escola.findMany();
    }
}
