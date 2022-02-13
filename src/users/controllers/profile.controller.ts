import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Req() req) {
    return this.showProfileService.execute(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBody({ type: UpdateProfileDTO })
  update(
    @Req() req,
    @Body()
    { email, name, old_password, password }: UpdateProfileDTO,
  ) {
    return this.updateProfileService.execute({
      email,
      name,
      old_password,
      password,
      user_id: req.user.id,
    });
  }
}
