import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}
  public async execute({ token }: IRequest): Promise<string> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { email, sub: userId } = verify(
      token,
      secret_refresh_token,
    ) as IPayload;

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(
      userId,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists');
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, secret_refresh_token, {
      subject: userId,
      expiresIn: expires_in_refresh_token,
    });

    const expiresDate = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokenRepository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    return refreshToken;
  }
}

export { RefreshTokenUseCase };
