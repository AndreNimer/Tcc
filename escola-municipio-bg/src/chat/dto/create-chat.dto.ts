import { Chat } from '../entities/chat.entity';
import {
  IsString,
} from 'class-validator';

export class ChatDto extends Chat {
  @IsString()
  mensagem: string;

  @IsString()
  envio_id: string;

  @IsString()
  recebe_id: string;
}

export class CreateChatDto {}
