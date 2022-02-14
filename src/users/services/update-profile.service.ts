import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { AppError } from 'src/shared/errors/AppError';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { UpdateProfileBO } from './bos/update-profile.bo';

@Injectable()
export class UpdateProfileService {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: UpdateProfileBO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }

    Object.assign(user, { name, email });

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await hash(password, 8);
    }

    return this.usersRepository.save(user);
  }
}
