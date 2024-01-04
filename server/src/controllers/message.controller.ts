// chat.controller.ts
import { Controller, Post, Body, Req, Res, HttpStatus, Get } from '@nestjs/common';
import { ChatService } from '../services/message.service';
import { MessageDto } from '../dto/message.dto';

@Controller()
export class MessageController {
  constructor(private readonly chatService: ChatService) {}

  @Post('sendMessage')
  async sendMessage(@Body() body: MessageDto, @Req() req, @Res() res): Promise<void> {
    try {
      const id = req.userId
      const body1 = {...body, fromUser: id}
      const saveMessage = await this.chatService.saveMessage(body1)
      await this.chatService.sendMessage(body1.fromUser, body1.toUser, body1.message)
      res.status(HttpStatus.OK).json(saveMessage)
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }

  @Get('viewMessages')
  async viewMessage(@Req() req, @Res() res){
    try {
      const userId = req.userId
      const data = await this.chatService.readMessage(userId)
      res.status(HttpStatus.OK).json(data)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }
}
