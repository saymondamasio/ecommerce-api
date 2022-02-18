import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      return null;
    }

    const passwordMatched = await compare(password, user.password);

    if (passwordMatched) {
      return user;
    }
    return null;
  }

  async refreshToken(user: User) {
    const userRefreshed = await this.usersRepository.findOne({ id: user.id });
    const payload = {
      email: userRefreshed.email,
      sub: userRefreshed.id,
      roles: userRefreshed.roles,
      permissions: userRefreshed.permissions,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(user: User, res: Response) {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles,
      permissions: user.permissions,
    };

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
