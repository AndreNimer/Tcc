import { Injectable } from '@nestjs/common';
import { MateriaDto} from './dto/create-materia.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MateriaService {
  constructor(private prisma:PrismaService) {}

  async create(materia: MateriaDto ){

          const { bimestre1, bimestre2, bimestre3, ...restoDoMateriaDto } = materia;
      
          const materiaSemBimestres = await this.prisma.materia.create({
            data: {
              ...restoDoMateriaDto,
            },
          });
      
          await this.prisma.materia.update({
            where: { id: materiaSemBimestres.id },
            data: {
              bimestre1: { push: bimestre1 },
              bimestre2: { push: bimestre2 },
              bimestre3: { push: bimestre3 },
            },
          });
      
          const materiaAtualizado = await this.prisma.materia.findUnique({
            where: { id: materiaSemBimestres.id },
          });
      
          return { ...materiaAtualizado };
  }
  async findAll() {
      return this.prisma.materia.findMany();
  }


  async addNumeroAoBimestre(id: string, numero: number, bimestre: number){
      const campoBimestre = `bimestre${bimestre}`;

      await this.prisma.materia.update({
        where: { id },
        data: {
          [campoBimestre]: { push: numero },
        },
      });
  
      const materiaAtualizado = await this.prisma.materia.findUnique({
        where: { id },
      });
  
      return { ...materiaAtualizado };
  }

  async getBimestres(id: string){
      const materia = await this.prisma.materia.findUnique({
        where: { id },
        select: {
          bimestre1: true,
          bimestre2: true,
          bimestre3: true,
          faltas: true,
        },
      });
  
      const bimestres = [materia.bimestre1, materia.bimestre2, materia.bimestre3];
      const faltas = [materia.faltas]
      const bimestresSoma = bimestres.map((bimestre) =>
          bimestre.reduce((acc, current) => acc + current, 0).toString()
      );

      return {bimestresSoma, faltas};
  }
  
  async update(id: string, numero: number){
    await this.prisma.materia.update({
      where: { id },
      data: {
        faltas: numero,
      },
    });
    const materiaAtualizado = await this.prisma.materia.findUnique({
      where: { id },
    });

    return { ...materiaAtualizado };
  }
  
  
}
