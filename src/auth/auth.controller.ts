import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const result = await this.authService.login(email, password);
        if (!result) {
            throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
        }
        return result;
    }
}
