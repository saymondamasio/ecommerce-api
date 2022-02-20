import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { Auth, google } from 'googleapis';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CreateUserWithGoogleService } from 'src/users/services/create-user-with-google.service';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
    private createUserWithGoogleService: CreateUserWithGoogleService,
    private jwtService: JwtService,
  ) {
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticateWithGoogle(token: string, response: Response) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      const userData = await this.getUserData(token);
      const name = userData.name;

      const user = await this.createUserWithGoogleService.execute({
        email,
        name,
      });

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
      response.cookie('refresh_token', refresh_token, {
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

    console.log(user);

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
    response.cookie('refresh_token', refresh_token, {
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

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

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
