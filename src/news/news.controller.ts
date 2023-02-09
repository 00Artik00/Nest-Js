import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { News, NewsService } from './news.service';
import { Str } from "@supercharge/strings"

@Controller('news')
export class NewsController {
    constructor(private readonly newService: NewsService) {}
    @Get('/all')
    getAllNews(@Param('id') id: string): News[] {
        return this.newService.getAll();
    }

    @Get('/:id')
    getOneNews(@Param('id') id: string): News {
        return this.newService.find(id);
    }

    @Post()
    createOrChange(@Body() news: News) {
        this.newService.createOrChange(news);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): string {
        const isDel = this.newService.remove(id);
        return isDel ? "Новость удалена" : "Передан неверный идентификатор"
    }

}
