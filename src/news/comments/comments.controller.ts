import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CommentsService, Comment } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
    @Post("/api")
    create(@Body() comment: Comment) {
        this.commentsService.create(comment)
    }
    @Post("/api/changeComment")
    change(@Body() comment: Comment) {
        this.commentsService.change(comment)
    }
    @Get('/api/:id')
    getOneNews(@Param('id') id: string): Comment[] {
        return this.commentsService.find(id);
    }
    @Delete('/api/:idNews/:idComents')
    delete(@Param('idNews') idNews: string, @Param('idComents') idComents: string): string {
        const isDel = this.commentsService.remove(idNews, idComents);
        return isDel ? "Коментарий удален" : "Передан неверный идентификатор"
    }
}
