import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../entities/user.entity';
import { ShowProfileService } from '../services/show-profile.service';
import { UpdateProfileService } from '../services/update-profile.service';
import { UpdateProfileDTO } from './dtos/update-profile.dto';

@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(
    private showProfileService: ShowProfileService,
    private updateProfileService: UpdateProfileService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  get(@CurrentUser() user: User) {
    return this.showProfileService.execute(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBody({ type: UpdateProfileDTO })
  update(
    @CurrentUser() user: User,
    @Body()
    { email, name, old_password, password }: UpdateProfileDTO,
  ) {
    return this.updateProfileService.execute({
      email,
      name,
      old_password,
      password,
      user_id: user.id,
    });
  }
}
