import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { storageConfig } from 'src/config/storage';
import { MailService } from './mail/mail.service';
import DiskStorageProvider from './providers/StorageProvider/implementations/disk-storage.provider';

const providers = {
  disk: DiskStorageProvider,
};

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          // port: 587,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `Equipe GoBarber <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'StorageProvider',
      useClass: providers[storageConfig.provider],
    },
    MailService,
  ],
  exports: ['StorageProvider', MailService],
})
export class SharedModule {}
