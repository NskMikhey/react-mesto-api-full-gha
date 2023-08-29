import React from 'react';
import headerLogo from '../images/headerLogo.svg';
import { Link, useLocation } from 'react-router-dom';

const Header = (props) => {

    const location = useLocation();

    const [menuBurgerActive, setMenuBurgerActive] = React.useState(false);

    // Бургер меню
    function handleOpenMenu() {
        setMenuBurgerActive(!menuBurgerActive);
    }

    return (
        <header className={props.loggedIn ? "header header_open" : "header"}>
            <nav className="header__nav">
                <div className="header__nav-wrapper">
                    <a className="header__link" href="/" title="Mesto Russia">
                        <img className="header__logo" src={headerLogo} alt="Логотип Место" />
                    </a>
                    {props.loggedIn && (
                        <button
                            className={menuBurgerActive ?
                                "header__menu-burger header__menu-burger button-hover" : "header__menu-burger button-hover"}
                            type="button"
                            aria-label="Меню"
                            onClick={handleOpenMenu}
                        />
                    )}
                    {!props.loggedIn && (
                        <>
                            {location.pathname === '/sign-up' &&
                                <Link to="/sign-in" className="header__button button-hover">Войти</Link>
                            }
                            {location.pathname === '/sign-in' &&
                                <Link to="/sign-up" className="header__button button-hover">Регистрация</Link>
                            }
                        </>
                    )}
                </div>
                {props.loggedIn && (
                    <div className={menuBurgerActive ? "header__menu header__menu_open" : "header__menu"}>
                        <p className="header__email">{props.email}</p>
                        { /* eslint-disable-next-line */}
                        <a onClick={props.signOut} className="header__button header__button-logout button-hover">
                            Выйти
                        </a>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;