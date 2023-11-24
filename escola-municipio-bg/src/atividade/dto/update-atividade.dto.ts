import { PartialType } from '@nestjs/mapped-types';
import { AtividadeDto } from './create-atividade.dto';

export class UpdateAtividadeDto extends PartialType(AtividadeDto) {}
