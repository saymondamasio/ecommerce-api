import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';

export class ResetPasswordDTO {
  @ApiProperty()
  @IsUUID()
  token: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @ValidateIf((o) => o.password)
  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })
  password_confirmation: string;
}
