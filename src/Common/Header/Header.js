import React, {useState} from "react";
import {GuestPanelButtons, PanelButtons, UserPanel, UserPanelButtons} from "./UserPanel";

import {Categories} from "./Categories";
import {Link} from 'react-router-dom';

function onSuperCatalogButtonSelect() {
    let subcatalogs = document.getElementsByClassName('categories');
    if (subcatalogs.length > 0) {
        subcatalogs[0].style.visibility = 'visible'
    }
}

function onSuperCatalogButtonDeselect() {
    let subcatalogs = document.getElementsByClassName('categories');
    if (subcatalogs.length > 0) {
        subcatalogs[0].style.visibility = 'hidden'
    }
}


export function Header({user}) {
    const {loggedIn, clientId} = user;
    return (<div id="header_wrapper">
        <div className="header background">
            <div className="header buttons">
                <div className="header button wrapper"
                     onMouseEnter={onSuperCatalogButtonSelect}
                     onMouseLeave={onSuperCatalogButtonDeselect}>
                    <Link to={"/catalog"} className="header button" id="button_catalog">
                        Каталог
                    </Link>
                    <Categories/>
                </div>
                <Link to={"/providers"}  className="header button" id="button_providers">
                    Поставщикам
                </Link>
                <Link to={"/cart?clientId=" + clientId} className="header button" id="button_cart_main">
                    Корзина
                </Link>
            </div>
            <span className="user">
                <UserPanel user={user}/>
                <UserPanelButtons hidden={!loggedIn} user={user}/>
                <GuestPanelButtons hidden={loggedIn}/>
            </span>
        </div>
    </div>)
}


function onUserSelected() {
    const userPanel = document.getElementById("user_panel");
    userPanel.style.display = "block";
}

function onUserDeselected() {
    const userPanel = document.getElementById("user_panel");
    userPanel.style.display = "none";
}
