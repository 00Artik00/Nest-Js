import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateNewsDto } from 'src/news/dto/create.news.dto';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendTest() {
        console.log('Отправляется письмо установки');
        return await this.mailerService
            .sendMail({
                to: 'laptenko.artem@mail.ru',
                subject: '🤩 Наше первое письмо!',
                template: './test',
            })
            .then((res) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    async sendNewNewsForAdmins(emails: string[], news: CreateNewsDto) {
        console.log('Отправляются письма о новой новости администрации ресурса');


        for (const email of emails) {

            await this.mailerService
                .sendMail({
                    to: email,
                    subject: `Создана новая новость: ${news.title}`,
                    template: './new-news',
                    context: news,
                })
                .then((res) => {
                    console.log('res', res);
                })
                .catch((err) => {
                    console.log('err', err);
                });
        }
    }
}
