import React, { useEffect } from "react";

const Popup = (props) => {

    const { closeHandler, className, children, isOpen } = props;

    // Закрытие по оверлею
    const handleOverlayClose = (evt) => {
        if (evt.target.classList.contains("popup")) {
            closeHandler();
        }
    };

    // Закрытие  по Esc
    const closeByEsc = (evt) => {
        if (evt.key === "Escape") {
            closeHandler();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleOverlayClose, false);
            document.addEventListener("keydown", closeByEsc, false);
        }

        return () => {
            document.removeEventListener("click", handleOverlayClose, false);
            document.removeEventListener("keydown", closeByEsc, false);
        };
        //eslint-disable-next-line
    }, [isOpen, closeHandler]);

    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default Popup;