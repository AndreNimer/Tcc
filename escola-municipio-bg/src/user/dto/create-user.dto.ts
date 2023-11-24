import { User, UserAluno, UserProfessor } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  senha: string;

  @IsString()
  nome: string;

  @IsString()
  cpf: string;
}

export class UserAlunoDto extends UserAluno {
  @IsString()
  escola_id: string;

  @IsString()
  responsavel_id: string;

  @IsString()
  cpf: string;
  
  @IsString()
  nome: string;

}

export class UserProfessorDto extends UserProfessor {
  @IsString()
  escola_id: string;

  @IsString()
  cpf: string;
  
  @IsString()
  nome: string;

}