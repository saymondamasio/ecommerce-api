import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';

export class UpdateProfileDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @ValidateIf((o) => o.password)
  @IsNotEmpty()
  old_password?: string;

  @ApiProperty()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @ValidateIf((o) => o.password)
  @Match('password', { message: 'Passwords do not match' })
  @IsNotEmpty()
  password_confirmation?: string;
}
