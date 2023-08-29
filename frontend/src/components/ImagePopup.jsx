import React from 'react';
import Popup from './Popup';
const ImagePopup = (props) => {

    const { name, link } = props.card;

    return (
        <Popup className={link !== '' ? "popup popup_is-opened image-popup" : "popup image-popup"}
            isOpen={true}
            aria-label="попап зума"
            closeHandler={props.onClose}
        >
            <div className="popup__image-container" aria-label="зум карточки">
                <button
                    className="popup__close-button button-hover"
                    type="button"
                    aria-label="Закрыть окно"
                    onClick={props.onClose} />
                <img src={link} alt={`Изображение ${name}`} className="popup__image" />
                <p className="popup__image-title">{name}</p>
            </div>
        </Popup>
    )
};

export default ImagePopup