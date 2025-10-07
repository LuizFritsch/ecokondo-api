import {
  Body,
  Controller,
  UnauthorizedException,
  HttpStatus,
  Post,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../models/loginDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() user: LoginDTO) {
    return await this.authService.signIn(user.email, user.password);
  }
}
