import { Escola } from '../entities/escola.entity';
import {
  IsString,
} from 'class-validator';
export class EscolaDto extends Escola {
    @IsString()
    nome: string;

    @IsString()
    cep: string;
}
