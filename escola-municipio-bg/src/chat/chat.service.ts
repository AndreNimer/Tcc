import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto } from './dto/create-chat.dto';


@Injectable()
export class ChatService {
  constructor(private prisma:PrismaService) {}

    async createChat(chatDTO: ChatDto ){
        const data = {
            ...chatDTO,
        };

        const chat = await this.prisma.chat.create({data,})

        return {...chat,}
    }
    async findAll() {
        return this.prisma.chat.findMany();
    }
}
