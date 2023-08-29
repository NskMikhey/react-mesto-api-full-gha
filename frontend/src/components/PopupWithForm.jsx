import React from "react";
import Popup from "./Popup";

const PopupWithForm = (props) => {
    return (
        <Popup
            className={[
                props.popupOpen ? "popup popup_is-opened" : "popup",
                `popup_${props.popupType}`,
            ].join(" ")}
            isOpen={true}
            closeHandler={props.onClose}
        >
            <div className={[
                "popup__container", `popup__container_${props.popupType}`
            ].join(' ')}>
                <button
                    className="popup__close-button button-hover"
                    type="button" aria-label="Закрыть окно"
                    onClick={props.onClose} />
                <h2 className="popup__title">{props.popupTitle}</h2>
                <form className={[
                    "popup__form", `popup__form_${props.popupType}`
                ].join(' ')}
                    name={props.popupFormName}
                    onSubmit={props.onSubmit}
                    noValidate>

                    {props.children}
                    <button className={["popup__submit", `popup__submit_${props.popupType}`, props.isValid ? '' : "popup__submit_disabled"
                    ].join(' ')}
                        type="submit"
                        data-value={props.submitButtonText}>
                        {props.isLoading ? props.loadingText : props.submitButtonText}
                    </button>
                </form>
            </div>
        </Popup >
    );
};
PopupWithForm.defaultProps = { isValid: true };
export default PopupWithForm;
