import { Injectable } from '@nestjs/common';
import { Str } from '@supercharge/strings/dist';
export type Comment = {
    id?: string,
    message: string,
    author: string,
    idNews: string,
    date?: Date,
    cover?: string
}
@Injectable()
export class CommentsService {
    private readonly comments = {};

    create(comment: Comment) {
        if (!this.comments[comment.idNews]) {
            this.comments[comment.idNews] = [];
        }
        const randomId = Str.random(10);
        const date = new Date();
        this.comments[comment.idNews].push({ ...comment, id: randomId, date: date });
    }
    find(idNews: string): Comment[] | undefined {
        return this.comments[idNews]
    }
    remove(idNews: Comment['idNews'], idComents: Comment['id']): boolean {
        if (!this.comments[idNews]) {
            return false
        }
        const indexRemove = this.comments[idNews].findIndex(el => el.id === idComents);
        if (indexRemove !== -1) {
            this.comments[idNews].splice(indexRemove, 1);
            return true
        }
        return false
    }
    change(comment: Comment) {
        let arrComment: Comment[] | undefined = this.comments[comment.idNews];
        let indexChange = null;
        if (arrComment) {
            indexChange = arrComment.findIndex(el => el.id === comment.id);
        }
        if (arrComment && indexChange !== -1) {
            const oldComment = this.comments[comment.idNews][indexChange];
            const date = new Date();
            this.comments[comment.idNews][indexChange] = { ...oldComment, date: date, message: comment.message }
        }
    }
}
