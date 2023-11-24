import { Body, Controller, Get, Param, Post,} from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaDto } from './dto/create-materia.dto';

@Controller()
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}
  
  @Get('materias') 
  async findAll() {
    return await this.materiaService.findAll();
  }

  
  @Post(':id/adicionar-nota/:bimestre')
  async adicionarNumeroAoBimestre(
    @Param('id') id: string,
    @Param('bimestre') bimestre: number,
    @Body('numero') numero: number,
  ){
    return this.materiaService.addNumeroAoBimestre(id, numero, bimestre);
  }
  @Get(':id/boletin')
  async getBimestres(@Param('id') id: string){
    return this.materiaService.getBimestres(id);
  }

  @Post(':id/faltas')
  async update(
    @Param('id') id: string,
    @Body('numero') numero: number,
  ){
    return this.materiaService.update(id, numero);
  }
  
}
