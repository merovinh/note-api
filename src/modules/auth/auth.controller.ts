import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User } from '../users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: UserDto) {
    const _user: User = await this.authService.validateUser(
      user.username,
      user.password,
    );
    if (!_user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(_user);
  }
}
