import { Controller, Get, Post, Body } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeDto } from './dto/create-atividade.dto';

@Controller()
export class AtividadeController {
  constructor(private readonly atividadeService: AtividadeService) {}

  @Post('atividadeEnvio')
  async create(@Body() data: AtividadeDto) {
    return this.atividadeService.create(data);
  }

  @Get('atividades') 
  async findAll() {
    return await this.atividadeService .findAll();
  }
}
