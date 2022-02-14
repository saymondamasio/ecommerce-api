import { IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class Address {
  @IsString()
  @Column({ name: 'address_street' })
  public street: string;
  @IsString()
  @Column({ name: 'address_number' })
  public number: string;
  @IsString()
  @IsOptional()
  @Column({ name: 'address_complement' })
  public complement: string;
  @IsString()
  @Column({ name: 'address_neighborhood' })
  public neighborhood: string;
  @IsString()
  @Column({ name: 'address_city' })
  public city: string;
  @IsString()
  @Column({ name: 'address_state' })
  public state: string;
  @IsString()
  @Column({ name: 'address_zip_code' })
  public zip_code: string;
}
