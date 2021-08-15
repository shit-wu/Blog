import { request } from "./request";

export default function getArticle() {
    return request({
        url: "/get",
        method: "GET",
    });
}
