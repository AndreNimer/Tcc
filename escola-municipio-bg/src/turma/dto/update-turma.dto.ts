import { PartialType } from '@nestjs/mapped-types';
import { TurmaDto } from './create-turma.dto';

export class UpdateTurmaDto extends PartialType(TurmaDto) {}
