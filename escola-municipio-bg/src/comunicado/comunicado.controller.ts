import { Controller, Get, Post, Body } from '@nestjs/common';
import { ComunicadoService } from './comunicado.service';
import { ComunicadoDto } from './dto/create-comunicado.dto';

@Controller()
export class ComunicadoController {
  constructor(private readonly comunicadoService: ComunicadoService) {}
  
  @Post('comunicadoEnvio')
  async create(@Body() data: ComunicadoDto) {
    return this.comunicadoService.create(data);
  }

  @Get('comunicado') 
  async findAll() { 
    return await this.comunicadoService.findAll();
  }
}
