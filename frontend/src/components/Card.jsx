import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
const Card = (props) => {

    // Контекст currentUser 
    const currentUser = React.useContext(CurrentUserContext);

    const { name, link, likes, owner } = props.card;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = likes.some(i => i === currentUser._id);
    // console.log(likes)
    // console.log(likes)
    // Нажатие на карточку 
    function handleClick() {
        props.onCardClick(props.card);
    }
    // Удаление карточки
    function handleDeleteClick() {
        props.onDeleteCard(props.card);
    }
    // Лайк/дизлайк 
    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <article className="card">
            {owner === currentUser._id
                && <button className="card__remove button-hover" type="button" aria-label="Удалить место"
                    onClick={handleDeleteClick} />
            }
            <img src={`${link}`} alt={name} className="card__image" onClick={handleClick} />

            <div className="card__info">
                <h2 className="card__title">{name}</h2>
                <div className="card__like-container">
                    <button
                        type="button"
                        className={`card__like button-hover ${isLiked && "card__like_active button-hover"}`}
                        // className={["card__like button-hover", isLiked ? "card__like_active button-hover" : ""].join(' ')}
                        aria-label="лайк"
                        onClick={handleLikeClick}
                    />
                    <p className="card__like-counter">{likes.length}</p>
                </div>
            </div>
        </article>
    )
};

export default Card
