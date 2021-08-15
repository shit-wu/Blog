import { request } from "./request";

export default function login(username, password) {
    return request({
        url: "/login",
        method: "POST",
        data: {
            username: username,
            password: password,
        },
    });
}
