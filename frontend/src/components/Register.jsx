import React from "react";
import { Link } from "react-router-dom";

const Register = (props) => {

    const [loginData, setLoginData] = React.useState({ email: "", password: "" });

    function handleLoginDataChange(evt) {
        const { name, value } = evt.target;
        setLoginData({
            ...loginData, [name]: value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.registration(loginData);
    };

    return (
        <div className="form form_registration">
            <div className="form__container">
                <h2 className="form__title">Регистрация</h2>
                <form className="form__body" onSubmit={handleSubmit}>
                    <input
                        required
                        type="email"
                        className="form__input"
                        name="email"
                        onChange={handleLoginDataChange}
                        value={loginData.email}
                        placeholder="Email"
                        autoComplete="off"
                    />
                    <input
                        required
                        type="password"
                        className="form__input"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginDataChange}
                        placeholder="Пароль"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className={[
                            "form__submit"
                        ].join(" ")}
                    >
                        Зарегистрироваться
                    </button>
                </form>
                <div className="form__login-group">
                    <p className="form__login-text">Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="form__login-link">Войти</Link>
                </div>
            </div>
        </div>)
}

export default Register;