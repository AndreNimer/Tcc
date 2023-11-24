import { Type } from 'class-transformer';
import { Atividade } from '../entities/atividade.entity';
import {
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';

export class AtividadeDto extends Atividade {
    @IsString()
    titulo:   string;

    @IsString()
    tipo: string;

    @IsString()
    decricao: string;

    @IsString()
    informacao: string;
    
    @IsNumber()
    nota: number;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsString()
    turma_id: string ;

    @IsString()
    professor_id: string;
}
