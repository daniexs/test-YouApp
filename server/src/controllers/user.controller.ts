// user.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dto';

@Controller('register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res): Promise<void> {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message || "Something went wrong" });
    }
  }
}
