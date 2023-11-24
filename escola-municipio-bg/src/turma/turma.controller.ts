import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaDto } from './dto/create-turma.dto';


@Controller()
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @Post('turma')
  async createTurma(@Body() data: TurmaDto) {
    return this.turmaService.createTurma(data);
  }

  @Get('turmas') 
  async findAll() {
    return await this.turmaService.findAll();
  }
}
