import { ISendMailDTO } from 'src/shared/mail/dtos/send-mail.dto';

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
