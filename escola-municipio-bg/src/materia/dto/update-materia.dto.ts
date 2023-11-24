import { PartialType } from '@nestjs/mapped-types';
import { MateriaDto } from './create-materia.dto';

export class UpdateMateriaDto extends PartialType(MateriaDto) {}
