import { request } from "./request";

export default function postArticle(blog, userId) {
    return request({
        url: "/post",
        method: "POST",
        data: {
            title: blog.title,
            category: blog.category,
            tag: blog.tag,
            content: blog.content,
            useId: userId,
        },
    });
}
