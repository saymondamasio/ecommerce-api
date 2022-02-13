import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { FindUserByEmailService } from 'src/users/services/find-user-by-email.service';

@Injectable()
export class AuthService {
  constructor(
    private findUserByEmailService: FindUserByEmailService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmailService.execute(email);

    if (!user) {
      return null;
    }

    const passwordMatched = await compare(password, user.password);

    if (passwordMatched) {
      return user;
    }
    return null;
  }

  async refreshToken(payload: any) {
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(user: User, res: Response) {
    const payload = { email: user.email, sub: user.id };

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.cookie('refresh_token', refresh_token, {
      secure:
        this.configService.get('HTTP_SECURE') === 'false' ? undefined : true,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: this.configService.get('PATH_REFRESH_TOKEN'),
    });

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
