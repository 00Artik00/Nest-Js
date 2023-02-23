import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Comment } from '../comments/comments.service';

export class CreateNewsDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    author: string;

    @IsOptional()
    @IsNumber()
    countView?: number;

    @IsOptional()
    @IsString()
    date?: string;

    @IsOptional()
    comments?: Comment[];

    @IsOptional()
    @IsString()
    cover?: string
}