import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ICreateUserDAO } from './daos/create-user.dao';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });

    return user;
  }

  public async createUser({
    name,
    email,
    password,
    store_id,
  }: ICreateUserDAO): Promise<User> {
    const user = this.create({ name, email, password, store_id });

    await this.save(user);

    return user;
  }

  public async saveUser(user: User): Promise<User> {
    return this.save(user);
  }
}
