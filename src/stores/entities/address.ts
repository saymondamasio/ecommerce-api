import { Column } from 'typeorm';

export class Address {
  @Column()
  public street: string;
  @Column()
  public number: string;
  @Column()
  public complement: string;
  @Column()
  public neighborhood: string;
  @Column()
  public city: string;
  @Column()
  public state: string;
  @Column()
  public zip_code: string;
}
