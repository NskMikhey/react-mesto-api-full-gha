import { apiSettings } from "./utils";

class Api {
    constructor(options) {
        this._headers = options.headers;
        this._serverURL = options.serverURL;
        /** возвращает ответ / ошибку после выполнения промиса */
        this._handlePromiseReturn = ((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    // РАБОТА С ДАННЫМИ ПОЛЬЗОВАТЕЛЯ
    //Получает информацию о пользователе с сервера
    getUserMe() {
        return fetch(`${this._serverURL}/users/me`, {
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers }
        })
            .then((res) => this._handlePromiseReturn(res));
    }
    //Отправляет инфо о пользователе на сервер
    setUserData(userName, userAbout) {
        return fetch(`${this._serverURL}/users/me`, {
            method: "PATCH",
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers },
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
            .then((res) => this._handlePromiseReturn(res));
    }

    //Обновляет аватар пользователя на сервере
    setUserAvatar(avatar) {
        return fetch(`${this._serverURL}/users/me/avatar`, {
            method: "PATCH",
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers },
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then((res) => this._handlePromiseReturn(res));
    }

    // РАБОТА С КАРТОЧКАМИ
    //Получает карточки с сервера
    getCards() {
        return fetch(`${this._serverURL}/cards`, {
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers }
        })
            .then((res) => this._handlePromiseReturn(res));
    }
    //Отправляет данные о новой карточке на сервер
    addNewCard(cardName, cardLink) {
        return fetch(`${this._serverURL}/cards`, {
            method: "POST",
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers },
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
            .then((res) => this._handlePromiseReturn(res));
    }
    // Ставит/удаляет лайк    
    changeLikeCardStatus(cardID, cardLiked) {
        return fetch(`${this._serverURL}/cards/${cardID}/likes`, {
            method: cardLiked ? "DELETE" : "PUT",
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers }
        })
            .then(res => this._handlePromiseReturn(res));
    }

    //Удаляет карточку с сервера
    removeCard(cardID) {
        return fetch(`${this._serverURL}/cards/${cardID}`, {
            method: "DELETE",
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers }
        })
    }
    // Параллельное получение информации о пользователе и карточек

    getAllData() {
        return Promise.all([this.getUserMe(), this.getCards()]);
    }
}

//Экземпляр API
export const api = new Api(apiSettings);
