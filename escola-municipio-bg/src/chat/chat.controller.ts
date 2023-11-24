import { Controller, Post, Body, Get} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/create-chat.dto';


@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('chat')
  async createChat(@Body() data: ChatDto) {
    return this.chatService.createChat(data);
  }

  @Get('mensagems') 
  async findAll() {
    return await this.chatService .findAll();
  }
}
