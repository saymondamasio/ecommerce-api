import { IsNotEmpty, IsString } from 'class-validator';

export class TokenVerificationDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
}
