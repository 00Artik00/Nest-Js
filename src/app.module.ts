import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { join } from 'path';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [NewsModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }), MailModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
