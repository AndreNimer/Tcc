import { PartialType } from '@nestjs/mapped-types';
import { ComunicadoDto } from './create-comunicado.dto';

export class UpdateComunicadoDto extends PartialType(ComunicadoDto) {}
