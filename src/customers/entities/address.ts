import { IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class Address {
  @IsString()
  @Column()
  public street: string;
  @IsString()
  @Column()
  public number: string;
  @IsString()
  @IsOptional()
  @Column()
  public complement: string;
  @IsString()
  @Column()
  public neighborhood: string;
  @IsString()
  @Column()
  public city: string;
  @IsString()
  @Column()
  public state: string;
  @IsString()
  @Column()
  public zip_code: string;
}
