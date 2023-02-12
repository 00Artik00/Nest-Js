import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from 'src/views/news/news-all';
import { renderTemplate } from 'src/views/template';
import { renderNewsOne } from 'src/views/news/news-one';

@Controller('news')
export class NewsController {
    constructor(private readonly newService: NewsService, private readonly commentsService: CommentsService) {}
    @Get('/all')
    getAllView(@Param('id') id: string) {
        const news = this.newService.getAll();
        const content = renderNewsAll(news);
        return renderTemplate(content, { title: "Список новостей", description: "Страница списка новостей" });
    }
    @Get('/:id/detail')
    getDetail(@Param('id') id: string) {
        const news = this.newService.find(id);
        const comments = this.commentsService.find(id);
        return renderTemplate(renderNewsOne(news, comments), { title: "Новость", description: "Страница новости" });
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
    createOrChange(@Body() news: News) {
        this.newService.createOrChange(news);
    }

    @Delete('/api/:id')
    delete(@Param('id') id: string): string {
        const isDel = this.newService.remove(id);
        return isDel ? "Новость удалена" : "Передан неверный идентификатор"
    }

}
