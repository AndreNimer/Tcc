import { Body, Controller, Get, Param, Post,} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserAlunoDto, UserProfessorDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @IsPublic()
  @Post('user')
  async create(@Body() data: UserDto) {
    return this.userService.create(data);
  }
  

  @Post('userAluno')
  async createAluno(@Body() data: UserAlunoDto) {
    return this.userService.createAluno(data)

  }
  @Get('alunos') 
  async findAllAlunos() {
    return await this.userService.findAllAlunos();
  }

  @IsPublic()
  @Post('userProfessor')
  async createProfessor(@Body() data: UserProfessorDto) {
    return this.userService.createProfessor(data);
  }

  @Get('professor') 
  async findAllProfessor() {
    return await this.userService.findAllProfessor();
  }
  
}
