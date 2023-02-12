import { News } from "src/news/news.service";
import { Comment } from "src/news/comments/comments.service";
function renderAllComments(comments: Comment[]) {
    let commentsHtmlList = "";
    if (comments) {
        for (const com of comments) {
            commentsHtmlList += `<li>${com.author}: ${com.message} (${com.date.toISOString()})</li>`
        }
    }
    return commentsHtmlList;
}
// export function renderNewsAll(news: News[]) {
//     let newsHtmlList = "";
//     for (const newsItem of news) {
//         newsHtmlList += renderNewsBlock(newsItem);
//     }
//     return `<h1>Список новостей</h1>
//     <div class="row">${newsHtmlList}</div>
//     `
// }
export function renderNewsOne(news: News, comments?: Comment[]) {
    return `
    <div class="card" style="width: 100%;">
    ${news.cover ? `<img src="${news.cover}" style="height:500px; object-fit: contain" class="card-img-top" alt="...">` : ''}
        <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
            <p class="card-text">${news.description}</p>
        </div>
        ${renderAllComments(comments) ? renderAllComments(comments) : "Список коментариев пуст"}
    </div>
    `
}