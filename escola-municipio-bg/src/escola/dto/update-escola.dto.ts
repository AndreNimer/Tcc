import { PartialType } from '@nestjs/mapped-types';
import { EscolaDto } from './create-escola.dto';

export class UpdateEscolaDto extends PartialType(EscolaDto) {}
