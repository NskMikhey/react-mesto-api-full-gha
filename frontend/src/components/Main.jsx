import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
    const currentUser = React.useContext(CurrentUserContext);
   
    return (
        <main>
            <section className="profile">
                <button
                    className="profile__edit-avatar-button button-hover"
                    aria-label="Редактировать аватар"
                    onClick={props.onUpdateAvatar}
                />
                <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button button-hover"
                        type="button"
                        title="Отредактировать данные"
                        aria-label="Редактировать профиль"
                        onClick={props.onEditProfile}
                    />
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button button-hover"
                    type="button"
                    title="Добавить фото"
                    aria-label="Добавить фото"
                    onClick={props.onNewPlace}
                />
            </section>
            <section className="elements">
                {props.cards.map(card => {
                    return (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick} // нажатие на карточку
                            onDeleteCard={props.onDeleteCard} // удаление
                            onCardLike={props.onCardLike} //лайк
                        />)
                })
                }
            </section>
        </main>
    )
};

export default Main