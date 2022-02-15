import { Column } from 'typeorm';

export class Address {
  @Column({ name: 'address_street' })
  public street: string;
  @Column({ name: 'address_number' })
  public number: string;
  @Column({ name: 'address_complement' })
  public complement: string;
  @Column({ name: 'address_neighborhood' })
  public neighborhood: string;
  @Column({ name: 'address_city' })
  public city: string;
  @Column({ name: 'address_state' })
  public state: string;
  @Column({ name: 'address_zip_code' })
  public zip_code: string;
}
