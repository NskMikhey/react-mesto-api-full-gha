/** Объект настроек для работы с API
 * @type {{headers: {"Content-Type": string}, serverURL: string}}
 */
export const apiSettings = {
    serverURL: "http://api.nskmikhey.nomoredomainsicu.ru",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
};

/** Объект с ошибками сервера
 * @type {{"400": string, "401": string}}
 */
export const SERVER_ERRORS = {
    400: "Одно из полей не заполнено или не прошло валидацию.",
    401: "Введен неверный email или пароль.",
    409: "Пользователь с введенным email уже зарегистрирован.",
}
