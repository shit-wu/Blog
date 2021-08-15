import { request } from "./request";

export default function deleteArticle(articleId) {
    return request({
        url: "/delete",
        method: "DELETE",
        data: {
            id: articleId,
        },
    });
}
