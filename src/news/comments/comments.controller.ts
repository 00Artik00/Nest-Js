import { Controller, Post, Body, Get, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCommentsDto } from '../dto/create.comments.dto';
import { CommentsService, Comment } from './comments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoad } from 'src/utils/helperFileLoader';
const PATH_COMMENTS = "/static/";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
    @Post("/api")
    @UseInterceptors(
        FileInterceptor('cover', {
            storage: diskStorage({
                destination: HelperFileLoad.destinationPath,
                filename: HelperFileLoad.customFileName
            })
        })
    )
    create(@Body() comment: CreateCommentsDto, @UploadedFile() cover: Express.Multer.File) {
        if (cover?.filename) {
            comment.cover = PATH_COMMENTS + cover.filename;
        }
        this.commentsService.create(comment)
    }
    @Post("/api/changeComment")
    @UseInterceptors(
        FileInterceptor('cover', {
            storage: diskStorage({
                destination: HelperFileLoad.destinationPath,
                filename: HelperFileLoad.customFileName
            })
        })
    )
    change(@Body() comment: CreateCommentsDto, @UploadedFile() cover: Express.Multer.File) {
        if (cover?.filename) {
            comment.cover = PATH_COMMENTS + cover.filename;
        }
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
