import { Materia } from '../entities/materia.entity';
import {
  IsArray,
  IsNumber,
  IsString,
} from 'class-validator';

export class MateriaDto extends Materia{

    @IsString()
    aluno_id: string;
    
    @IsString()
    nome: string;
    
    @IsNumber()
    faltas: number;
    
    @IsArray()
    @IsNumber({}, { each: true })
    bimestre1: number[];
    
    @IsArray()
    @IsNumber({}, { each: true })
    bimestre2: number[];
    
    @IsArray()
    @IsNumber({}, { each: true })
    bimestre3: number[];
      
}
