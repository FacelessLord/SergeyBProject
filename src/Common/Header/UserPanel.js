import React from "react";

import {Link} from "react-router-dom";
import {logoutUser} from "../IdProvider";

export function GuestPanelButtons({hidden = true}) {
    return (<div id={"user_panel"} className="header user panel guest" style={{display: hidden ? "none" : "block"}}>
        <div className="header user panel rect">
            <Link to={"/login"} className="header buttons button user login" id="button_login">
                Войти
            </Link>
            <Link to={"/register"} className="header buttons button user register" id="button_register">
                Регистрация
            </Link>
        </div>
        <div className="user panel pointer"/>
    </div>)
}

export function UserPanelButtons({hidden}) {
    return (<div id={"user_panel"} className="header user panel logged" style={{display: hidden ? "none" : "block"}}>
        <div className="header user panel rect">
            <Link to={"/account?access_token=" + window.user.access_token} className="header user buttons button user account"
                  id="button_account">
                Личный кабинет
            </Link>
            <Link to={"/cart?access_token=" + window.user.access_token} className="header user buttons button user cart"
                  id="button_cart">
                Корзина
            </Link>
            <button className="header user buttons button user skip" style={{visibility: "hidden"}}>
                <div className="header user text">skip</div>
            </button>
            <Link className="header user buttons button user logout" id="button_logout" to={document.location} onClick={logoutUser}>
                Выйти
            </Link>
        </div>
        <div className="header user panel pointer"/>
    </div>)
}

const guest = "Гость";

export function UserPanel() {
    let name = window.user.loggedIn ? window.user.username : guest;
    return (<div className="header user panel profile">
        <div className="header user text" id="username">{name}</div>
        <div className="header user pic">
            <div className="fa fa-user"/>
        </div>
    </div>)
}

export function PanelButtons({hidden}) {
    if (window.user.loggedIn) {
        return (<UserPanelButtons hidden={hidden}/>)
    }
    return (<GuestPanelButtons hidden={hidden}/>)
}
