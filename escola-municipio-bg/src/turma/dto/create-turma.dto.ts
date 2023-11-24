import { Turma } from '../entities/turma.entity';
import {
  IsArray,
  IsString,
} from 'class-validator';

export class TurmaDto extends Turma{
    
    @IsString()
    escola_id:   string;

    @IsArray()
    @IsString({ each: true }) 
    aluno_id: string[];

    @IsString()
    professor_id: string;
    
    @IsString()
    nome: string;

}
