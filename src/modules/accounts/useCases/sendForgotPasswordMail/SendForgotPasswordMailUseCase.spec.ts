import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '../../repositories/in-memory/UsersTokenRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  });

  it('should be able to send a forgot password mail to user.', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'João Santos',
      driverLicense: '664168',
      email: 'joao@email.com',
      password: '123456',
    });

    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');
    const createUsersToken = jest.spyOn(usersTokenRepositoryInMemory, 'create');

    await sendForgotPasswordMailUseCase.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
    expect(createUsersToken).toHaveBeenCalled();
  });

  it('should not be able to send mail if user does not exists.', async () => {
    const response = sendForgotPasswordMailUseCase.execute({
      email: 'no-existing-email@email.com',
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });
});
