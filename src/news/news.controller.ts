import { Body, Controller, Get, Param, Post, Delete, UploadedFile, UseInterceptors, Render } from '@nestjs/common';
import { News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { CreateNewsDto } from './dto/create.news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoad } from 'src/utils/helperFileLoader';
import { MailService } from 'src/mail/mail.service';

const PATH_NEWS = "/static/";
HelperFileLoad.path = PATH_NEWS;

@Controller('news')
export class NewsController {
    constructor(
        private readonly newService: NewsService,
        private readonly commentsService: CommentsService,
        private readonly mailService: MailService,
    ) {}
    @Get('/all')
    @Render('news-list')
    renderAllNews() {
        const news = this.newService.getAll();
        return { news: news, title: "Список новостей" };
    }
    @Get('/create/new')
    @Render('create-news')
    async createView() {
        return {}
    }
    @Get('/:id/detail')
    @Render('news-detail')
    getDetail(@Param('id') id: string) {
        const news = this.newService.find(id);
        const comments = this.commentsService.find(id);
        // return renderTemplate(renderNewsOne(news, comments), { title: news.title, description: news.description });
        return { news: news, comments: comments, title: news.title }
    }
    @Get('/api/all')
    getAllNews(@Param('id') id: string): News[] {
        return this.newService.getAll();
    }

    @Get('/api/:id')
    getOneNews(@Param('id') id: string): News {
        const news = this.newService.find(id);
        const comment = this.commentsService.find(id);
        return { ...news, comments: comment }
    }

    @Post("/api")
    @UseInterceptors(
        FileInterceptor('cover', {
            storage: diskStorage({
                destination: HelperFileLoad.destinationPath,
                filename: HelperFileLoad.customFileName
            })
        })
    )
    async createOrChange(@Body() news: CreateNewsDto, @UploadedFile() cover: Express.Multer.File) {
        if (cover?.filename) {
            news.cover = PATH_NEWS + cover.filename;
        }
        const createOrChange = this.newService.createOrChange(news);
        if (createOrChange.type = 'create') {
            await this.mailService.sendNewNewsForAdmins(['laptenko.artem@mail.ru'], createOrChange.news)
        }
        if (createOrChange.type = 'change') {
            await this.mailService.sendNewNewsForAdmins(['laptenko.artem@mail.ru'], createOrChange.news)
        }
    }

    @Delete('/api/:id')
    delete(@Param('id') id: string): string {
        const isDel = this.newService.remove(id);
        return isDel ? "Новость удалена" : "Передан неверный идентификатор"
    }

}
