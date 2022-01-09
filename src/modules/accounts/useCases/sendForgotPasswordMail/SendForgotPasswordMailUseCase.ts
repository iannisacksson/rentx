import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect.');
    }

    const token = uuidV4();
    const expiresDate = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      expiresDate,
      refreshToken: token,
      userId: user.id,
    });

    await this.mailProvider.sendMail({
      body: `O link para o reset é ${token}`,
      subject: 'Recuperação de senha',
      to: email,
    });
  }
}

export { SendForgotPasswordMailUseCase };
