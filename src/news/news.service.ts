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
@Injectable()
export class NewsService {
    private readonly news: News[] = [
        {
            id: "randomId",
            title: "news 1",
            description: "some descr about first news",
            author: "Author 1",
            countView: 12,
            cover: "https://sun9-70.userapi.com/sun9-14/impg/1P9R0wT2lsZc2iMes9019B1MDZ5De52JPtl2VA/WlqeX6C2snQ.jpg?size=1280x854&quality=95&sign=d55ff75b59a9887d3abe21ba3c3192e7&c_uniq_tag=EFoN7xgNck93MrAZ9Qkbm_IBk7Y792dl3G1iTk4zasM&type=album"
        }
    ];
    getAll() {
        return this.news;
    }
    create(news: News) {
        const randomId = `${Str.random(10)}`;
        const date = new Date().toString()
        this.news.push({ ...news, id: randomId, date: date });
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
    change(news: News): string {
        const indexChange = this.news.findIndex(el => el.id == news.id);

        if (indexChange !== -1) {
            const date = new Date().toString()
            console.log(indexChange);
            this.news[indexChange] = { ...news, date: date };
            return 'Новость успешно изменена'
        } else {
            return 'По данному идентификатору новость не найдена'
        }
    }
    createOrChange(news: News) {
        if (this.news.find(el => el.id == news.id)) {
            this.change(news);
        } else {
            this.create(news);
        }
    }
}
