import React from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

    // Стейт карточки с названием и ссылкой на изображение 
    const [card, setCard] = React.useState({ name: '', link: '' });

    // Стейты валидации инпутов, формы  сообщений ошибок валидации
    const [formInputsValid, setFormInputsValid] = React.useState({ name: true, about: true });
    const [formValidationMessages, setFormValidationMessages] = React.useState({ name: "", about: "" });
    const [formValid, setFormValid] = React.useState(true);

    // Обрабатывает валидацию ввода события
    const handleInputValid = (evt) => {
        evt.preventDefault();
        const { name } = evt.target;

        if (!evt.target.validity.valid) {

            setFormInputsValid({
                ...formInputsValid,
                [name]: false
            });

            setFormValidationMessages({
                ...formValidationMessages,
                [name]: evt.target.validationMessage
            });

        } else {
            setFormInputsValid({
                ...formInputsValid,
                [name]: true
            });

            setFormValidationMessages({
                ...formValidationMessages,
                [name]: ""
            });
        }
    }

    // Закрытие и сброс
    function handleOnClose() {
        props.onClose();
        setFormInputsValid({ name: false, link: false });
        setFormValidationMessages({ name: "", link: "" });
        setFormValid(false);
    }

    // Изменяет стейт card 
    function handleCardChange(evt) {
        const { name, value } = evt.target;
        setCard({
            ...card,
            [name]: value
        })
        handleInputValid(evt);
    }

    // Отправка формы
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace(card);
    }

    React.useEffect(() => {
        setFormInputsValid({ name: false, link: false });
        setFormValidationMessages({ name: "", link: "" });
        setFormValid(false);
        setCard({ name: '', link: '' });
    }, [props.popupOpen])

    React.useEffect(() => {
        const formInputsValidValues = Object.values(formInputsValid);
        const isFormValid = formInputsValidValues.includes(false) ? false : true;
        setFormValid(isFormValid);
    }, [formInputsValid, props.popupOpen]);

    return (
        <PopupWithForm
            popupType="new-place"
            popupTitle="Новое место"
            submitButtonText="Создать"
            popupOpen={props.popupOpen}
            onClose={handleOnClose}
            onOverlayClose={props.onOverlayClose}
            popupFormName="newPlaceForm"
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            loadingText={props.loadingText}
            isValid={formValid}
        >
            <label className="popup__input-group" htmlFor="place-title">
                <input
                    className="popup__input popup__input_place_title"
                    type="text"
                    placeholder="Название"
                    value={card.name || ""}
                    name="name"
                    id="name_title"
                    required
                    minLength={2}
                    maxLength={30}
                    onChange={handleCardChange}
                />
                <span
                    className={["popup__error", formValidationMessages.name !== "" ? "popup__error_visible" : ""].join(" ")}
                    id="place_name-error"
                >{formValidationMessages.name}</span>
            </label>
            <label className="popup__input-group" htmlFor="place-description">
                <input
                    className="popup__input popup__input_place_description"
                    type="url"
                    placeholder="Ссылка на картинку"
                    value={card.link || ""}
                    name="link"
                    id="place_link"
                    required
                    onChange={handleCardChange}
                />
                <span
                    className={["popup__error", formValidationMessages.link !== "" ? "popup__error_visible" : ""].join(" ")}
                    id="place_url-error"
                >{formValidationMessages.link}</span>
            </label>
        </PopupWithForm>
    );
};
export default AddPlacePopup;
