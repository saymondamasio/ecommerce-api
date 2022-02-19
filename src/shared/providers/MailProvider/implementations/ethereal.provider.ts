import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ISendMailDTO } from 'src/shared/mail/dtos/send-mail.dto';

@Injectable()
export class EtherealMailProvider {
  constructor(private mailerService: MailerService) {}

  public async sendMail({
    to,
    from,
    subject,
    context,
  }: ISendMailDTO): Promise<void> {
    const message = await this.mailerService.sendMail({
      from: {
        name: from?.name,
        address: from?.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      context,
      template: 'forgot_password',
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}
