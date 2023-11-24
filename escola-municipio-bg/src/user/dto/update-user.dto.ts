import { PartialType } from '@nestjs/mapped-types';
import { UserDto, UserAlunoDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UserDto) {}

export class UpdateUserAlunoDto extends PartialType(UserAlunoDto) {}

