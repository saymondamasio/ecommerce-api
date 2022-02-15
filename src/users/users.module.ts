import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { StoresRepository } from 'src/stores/repositories/stores.repository';
import { PasswordController } from './controllers/passwords.controller';
import { ProfileController } from './controllers/profile.controller';
import { UsersController } from './controllers/users.controller';
import { UserTokensRepository } from './repositories/user-tokens.repository';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserService } from './services/create-user.service';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { ResetPasswordService } from './services/reset-password.service';
import { SendForgotPasswordEmailService } from './services/send-forgot-password-email.service';
import { ShowProfileService } from './services/show-profile.service';
import { UpdateProfileService } from './services/update-profile.service';
import { UpdateUserAvatarService } from './services/update-user-avatar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      UserTokensRepository,
      StoresRepository,
    ]),
    SharedModule,
  ],
  controllers: [UsersController, ProfileController, PasswordController],
  providers: [
    FindUserByEmailService,
    CreateUserService,
    UpdateUserAvatarService,
    UpdateProfileService,
    ResetPasswordService,
    SendForgotPasswordEmailService,
    ShowProfileService,
  ],
  exports: [FindUserByEmailService],
})
export class UsersModule {}
