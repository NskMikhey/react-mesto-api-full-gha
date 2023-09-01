import { apiSettings, SERVER_ERRORS } from "./utils";

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(SERVER_ERRORS[res.status]);
    }
}

// Отправка рег. данных
export const register = (registerData) => {
    return fetch(`${apiSettings.serverURL}/signup`, {
        method: "POST",
        headers: apiSettings.headers,
        body: JSON.stringify(registerData)
    })
        .then((res) => handleResponse(res))
}

// функция, которая будет проверять логин и пароль пользователя
// на соответствие какому-либо профилю, хранящемуся в базе данных
export const authorize = (loginData) => {
    return fetch(`${apiSettings.serverURL}/signin`, {
        method: "POST",
        headers: apiSettings.headers,
        body: JSON.stringify(loginData)
    })
        .then((res) => handleResponse(res))
}

// Запрос для проверки валидности токена и получения email для вставки в шапку сайта
export const tokenCheck = (token) => {
    return fetch(`${apiSettings.serverURL}/users/me`, {
        method: 'GET',
        headers: { authorization: 'Bearer ' + localStorage.getItem("jwt"), ...apiSettings.headers },
    })
        .then((res) => handleResponse(res))
}