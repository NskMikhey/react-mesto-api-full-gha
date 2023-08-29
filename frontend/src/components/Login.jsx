import React from "react";

const Login = (props) => {
    const [loginData, setLoginData] = React.useState({email: "", password: ""});

    function handleLoginDataChange(evt) {
        const {name, value} = evt.target;
        setLoginData({
            ...loginData, [name]: value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.authorization(loginData);
    };

    return (
        <div className="form form_login">
            <div className="form__container">
                <h2 className="form__title">Вход</h2>
                <form className="form__body" onSubmit={handleSubmit}>
                    <input
                        className="form__input"
                        type="email"
                        placeholder="Email"
                        value={loginData.email || ""}
                        name="email"
                        id="email"
                        required
                        onChange={handleLoginDataChange}
                        autoComplete="off"
                    />
                    <input
                        className="form__input"
                        type="password"
                        placeholder="Пароль"
                        value={loginData.password || ""}
                        name="password"
                        id="password"
                        required
                        onChange={handleLoginDataChange}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className={[
                            "form__submit",
                            `form__submit_${props.popupType}`
                        ].join(" ")}
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Login;