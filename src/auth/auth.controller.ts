import { Controller, Body, Post, UseGuards, Req } from '@nestjs/common';
import { SignupDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signup: SignupDto) {
    await this.authService.signup(signup);
    return 'User registered';
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signin(@Req() req) {
    return this.authService.signin(req.user);
  }
}
