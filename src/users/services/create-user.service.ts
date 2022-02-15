import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AppError } from 'src/shared/errors/AppError';
import { StoresRepository } from 'src/stores/repositories/stores.repository';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserBO } from './bos/create-user.bo';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private storesRepository: StoresRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    store_id,
  }: CreateUserBO): Promise<User> {
    const checkStoreExists = await this.storesRepository.findOne(store_id);

    if (!checkStoreExists) {
      throw new AppError('Store not exists.');
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
      store_id,
    });

    return user;
  }
}
