import React from "react";

import {Link} from "react-router-dom";
import {logoutUser} from "../IdProvider";

export function GuestPanelButtons({hidden = true}) {
    return (<div id={"user_panel"} className="header user panel guest" style={{display: hidden ? "none" : "block"}}>
        <div className="header user panel rect">
            <Link to={"/login"} className="header buttons button type3 user login" id="button_login">
                Войти
            </Link>
            <Link to={"/register"} className="header buttons button type3 user register" id="button_register">
                Регистрация
            </Link>
        </div>
        <div className="user panel pointer"/>
    </div>)
}

export function UserPanelButtons({hidden}) {
    return (<div id={"user_panel"} className="header user panel logged" style={{display: hidden ? "none" : "block"}}>
        <div className="header user panel rect">
            <Link to={"/account"} className="header buttons button type3 user accountLink"
                  id="button_account">
                Личный кабинет
            </Link>
            <Link to={"/cart"} className="header buttons button type3 user cart"
                  id="button_cart">
                Корзина
            </Link>
            <Link to={"/item/create"} className="header buttons button type3 user skip"
                  style={{display: window.user.permission > 0 ? "block" : "none"}}
                  id="button_create">
                Добавить товар
            </Link>
            <Link to={"/orders"} className="header buttons button type3 user skip" id="button_create">
                Заказы
            </Link>
            <Link className="header buttons button type3 user logout" id="button_logout" to={document.location}
                  onClick={() => {
                      logoutUser()
                      document.location = "/"
                  }}>
                Выйти
            </Link>
            <Link to={"/login"} className="header buttons button type3 user relogin" id="button_relogin"
                  style={{display: "none"}}>
                Войти
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
