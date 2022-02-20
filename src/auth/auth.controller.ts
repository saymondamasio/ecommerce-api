import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { TokenVerificationDTO } from './dtos/token-verification-dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh-token.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) res) {
    return this.authService.login(user, res);
  }

  @Post('google')
  async authenticate(
    @Body() tokenData: TokenVerificationDTO,
    @Res({ passthrough: true }) res,
  ) {
    return await this.authService.authenticateWithGoogle(tokenData.token, res);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@CurrentUser() user: User) {
    return this.authService.refreshToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('revoke')
  @HttpCode(HttpStatus.OK)
  async revoke(@Res() res) {
    res.clearCookie('refresh_token', {
      secure: this.configService.get<boolean>('HTTP_SECURE'),
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: this.configService.get('PATH_REFRESH_TOKEN'),
    });
    res.end();
  }
}
