import { IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateCommentsDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    author: string;

    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    date?: Date;

    @IsString()
    idNews: string;

    @IsOptional()
    @IsString()
    cover?: string;
}