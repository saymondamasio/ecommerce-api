import { IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class Address {
  @IsString()
  @Column()
  public street: string;

  @Column()
  @IsString()
  public number: string;

  @Column()
  @IsOptional()
  @IsString()
  public complement: string;

  @Column()
  @IsString()
  public neighborhood: string;

  @Column()
  @IsString()
  public city: string;

  @Column()
  @IsString()
  public state: string;

  @Column()
  @IsString()
  public zip_code: string;
}
