import { Injectable } from '@nestjs/common';
import { UserDto, UserAlunoDto, UserProfessorDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MateriaService } from 'src/materia/materia.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService, private materia:MateriaService) {}

    async create(userDTO: UserDto ){
        const data = {
            ...userDTO,
            senha: await bcrypt.hash(userDTO.senha, 10),
        };

        const user = await this.prisma.user.create({data,})

        return {...user, senha: undefined}
    }
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where:{
                email,
            },
        });
    }


    async createAluno(userAluno: UserAlunoDto){
        const data = {
          ...userAluno,
        };
      
        const aluno = await this.prisma.userAluno.create({ data });
        const materiaIds = [];
      
        const nomesMaterias = ['Português', 'História', 'Matemática', 'Ciências', 'Geografia', 'Educação Física'];
      
        for (let i = 0; i < nomesMaterias.length; i++) {
          const materiaData = {
            nome: nomesMaterias[i],
            aluno_id: aluno.id,
            faltas: 0,
            bimestre1: [0],
            bimestre2: [0],
            bimestre3: [0],
          };
      
          const materia = await this.materia.create(materiaData);
          materiaIds.push(materia.id);
        }
      
        return { aluno, materiaIds };
    }
    async findAllAlunos() {
        return this.prisma.userAluno.findMany();
    }

    async createProfessor(UserProfessor: UserProfessorDto ){
        const data = {
            ...UserProfessor,
        };

        const professor = await this.prisma.userProfessor.create({data,})

        return {...professor}
    }
    async findAllProfessor() {
        return this.prisma.userProfessor.findMany();
    }

    
}
