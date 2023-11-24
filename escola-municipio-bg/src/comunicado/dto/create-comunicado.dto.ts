import { Comunicado } from '../entities/comunicado.entity';
import {
    IsString,
} from 'class-validator';
export class ComunicadoDto extends Comunicado{
    
        @IsString()
        titulo: string;
    
        @IsString()
        recado: string;

        @IsString()
        escola_id: string;

}
