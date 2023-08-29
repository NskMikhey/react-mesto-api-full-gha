import React from "react";
import Popup from "./Popup";
import tooltipError from "../images/tooltip_error.svg";
import tooltipSuccess from "../images/tooltip_succes.svg";

const InfoTooltip = (props) => {
    const tooltipTypes = {
        reg_success: { image: tooltipSuccess, text: "Вы успешно зарегистрировались!" },
        error: { image: tooltipError, text: "Что-то пошло не так! Попробуйте ещё раз." }
    };

    return (
        <Popup
            className={props.popupOpen ? "popup popup_is-opened" : "popup"}
            isOpen={true}
            closeHandler={props.onClose}
        >
            <div
                className="popup__container"
            >
                <button
                    className="popup__close-button button-hover"
                    type="button"
                    aria-label="Закрыть окно"
                    onClick={props.onClose}
                />
                <div className="popup__tooltip">
                    <img className="popup__tooltip-image" src={tooltipTypes[props.type].image}
                        alt={tooltipTypes[props.type].text} />
                    <p className="popup__tooltip-text">{tooltipTypes[props.type].text}</p>
                </div>
            </div>
        </Popup>);
};

export default InfoTooltip;