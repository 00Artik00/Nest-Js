import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://artem_laptenko@mail.ru:xRrD8jFjC5x6Wtb7Yizh@smtp.mail.ru',
      defaults: {
        from: '"NestJS робот" <artem_laptenko@mail.ru>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],

  exports: [MailService],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}