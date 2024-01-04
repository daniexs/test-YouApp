// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, Res, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: CreateUserDto, @Res() res,): Promise<any> {
    try {
      const user = await this.userService.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = await this.authService.generateToken(user);
      res.status(HttpStatus.OK).json({token})
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message || "Something went wrong" });
    }
  }
}
