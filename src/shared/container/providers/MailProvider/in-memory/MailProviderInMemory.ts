import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  public async sendMail({
    path,
    subject,
    to,
    variables,
  }: ISendMailDTO): Promise<void> {
    this.message.push(path, subject, to, variables);
  }
}

export { MailProviderInMemory };
