import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/user-token.entity';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  async findByUserIdAndToken(
    user_id: string,
    token: string,
  ): Promise<UserToken> {
    const usersTokens = await this.findOne(
      {
        user_id,
        token,
      },
      { relations: ['user'] },
    );
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.delete(id);
  }

  async findByToken(token: string): Promise<UserToken> {
    const userToken = await this.findOne({ token });

    return userToken;
  }
}
