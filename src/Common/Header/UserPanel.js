import React from "react";

import '../../styles/header_styles.css';
import {Link} from "react-router-dom";

export function GuestPanelButtons({hidden = true}) {
    return (<div id="guest_panel" style={{visibility: (hidden ? "hidden" : "visible")}}>
        <div className="guest panel">
            <Link to={"/login"} className="guest button login" id="button_login">
                <div className="guest button text">Войти</div>
            </Link>
            <Link to={"/register"} className="guest button register" id="button_register">
                <div className="guest button text">Регистрация</div>
            </Link>
        </div>
        <div className="user panel pointer"/>
    </div>)
}

export function UserPanelButtons({hidden, user}) {
    return (<div id="user_panel" style={{visibility: hidden ? "hidden" : "visible"}}>
        <div className="user panel">
            <Link to={"/account?clientId=" + user.clientId} className="user button account" id="button_account">
                <div className="user button text">Личный кабинет</div>
            </Link>
            <Link to={"/cart?clientId=" + user.clientId} className="user button cart" id="button_cart">
                <div className="user button text">Корзина</div>
            </Link>
            <button className="user button skip" style={{visibility: "hidden"}}>
                <div className="user button text">skip</div>
            </button>
            <Link to={"/logout"} className="user button logout" id="button_logout">
                <div className="user button text">Выйти</div>
            </Link>
        </div>
        <div className="user panel pointer"/>
    </div>)
}

const guest = "Гость";

export function UserPanel({user}) {
    let name = user.loggedIn ? user.username : guest;
    return (<div className="user container">
        <span className="user text" id="username">{name}</span>
        <div className="user pic">
            <div className="fa fa-user"/>
        </div>
    </div>)
}
