import { Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserWithGoogleBO } from './bos/create-user-with-google.bo';

@Injectable()
export class CreateUserWithGoogleService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email }: CreateUserWithGoogleBO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = this.usersRepository.create({
      name,
      email,
      isRegisteredWithGoogle: true,
    });

    this.usersRepository.save(user);

    return user;
  }
}
