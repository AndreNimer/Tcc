import { Body, Controller, Get, Post,} from '@nestjs/common';
import { EscolaService } from './escola.service';
import { EscolaDto } from './dto/create-escola.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()

export class EscolaController {
  constructor(private readonly EscolaService: EscolaService) {}
  
  @IsPublic()
  @Post('escola-cadastro')
  async create(@Body() data: EscolaDto) {
    return this.EscolaService.create(data);
  }

  @Get('escolas') 
  async findAll() { 
    return await this.EscolaService.findAll();
  }
}
