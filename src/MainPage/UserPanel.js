import React from "react";

import '../styles/header_styles.css';
import {Abutton} from "./AButton";

export function GuestPanelButtons({hidden=true}) {
    return (<div id="guest_panel" style={{visibility: (hidden ? "hidden" : "visible")}}>
        <div className="guest panel">
            <button className="guest button login" id="button_login">
                <div className="guest button text">Войти</div>
            </button>
            <button className="guest button register" id="button_register">
                <div className="guest button text">Регистрация</div>
            </button>
        </div>
        <div className="user panel pointer"/>
    </div>)
}

export function UserPanelButtons({hidden, user}) {
    return (<div id="user_panel" style={{visibility:  hidden ? "hidden" : "visible"}}>
        <div className="user panel">
            <Abutton className="user button account" id="button_account" href={"/account?clientId=" + user.clientId}>
                <div className="user button text">Личный кабинет</div>
            </Abutton>
            <Abutton className="user button cart" id="button_cart" href={"/cart?clientId=" + user.clientId}>
                <div className="user button text">Корзина</div>
            </Abutton>
            <button className="user button skip" style={{visibility: "hidden"}}>
                <div className="user button text">skip</div>
            </button>
            <Abutton className="user button logout" id="button_logout" href={"/logout"}>
                <div className="user button text">Выйти</div>
            </Abutton>
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
