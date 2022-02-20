import { IsString } from 'class-validator';

export class CreateUserByGoogleDTO {
  @IsString()
  token: string;
}
