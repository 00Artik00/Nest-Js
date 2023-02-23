import { Injectable } from '@nestjs/common';
import { Str } from "@supercharge/strings";
import { Comment } from './comments/comments.service';
export interface News {
    id?: string,
    title: string,
    description: string,
    author: string,
    countView?: number,
    date?: string,
    comments?: Comment[],
    cover?: string
}
export interface CreateOrChange {
    type: 'create' | 'change',
    news: News
}
@Injectable()
export class NewsService {
    private readonly news: News[] = [
        {
            id: "randomId",
            title: "news 1",
            description: "some descr about first news",
            author: "Author 1",
            countView: 12,
            cover: "https://chudo-prirody.com/uploads/posts/2021-08/1628904992_30-p-skachat-foto-milikh-kotikov-34.jpg"
        }
    ];
    getAll() {
        return this.news;
    }
    create(news: News): News {
        const randomId = `${Str.random(10)}`;
        const date = new Date().toString()
        this.news.push({ ...news, id: randomId, date: date });
        return this.find(randomId);
    }
    find(id: News['id']): News | undefined {
        return this.news.find(el => el.id === id)
    }
    remove(id: News['id']): boolean {
        const indexRemove = this.news.findIndex(el => el.id === id);
        if (indexRemove !== -1) {
            this.news.splice(indexRemove, 1);
            return true
        }
        return false
    }
    change(news: News): News {
        const indexChange = this.news.findIndex(el => el.id == news.id);

        if (indexChange !== -1) {
            const date = new Date().toString()
            console.log(indexChange);
            this.news[indexChange] = { ...news, date: date };
            return this.news[indexChange]
        }
    }
    createOrChange(news: News): CreateOrChange {
        if (this.news.find(el => el.id == news.id)) {
            const changedNews = this.change(news);
            return { type: 'change', news: changedNews }
        } else {
            const createdNews = this.create(news);
            return { type: 'create', news: createdNews }
        }
    }
}
