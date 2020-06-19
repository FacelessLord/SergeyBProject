import React from "react";
import {GuestPanelButtons, UserPanel, UserPanelButtons} from "./UserPanel";

import '../../styles/header_styles.css';
import {Categories} from "./Categories";
import {Link} from 'react-router-dom';

function onSuperCatalogButtonSelect() {
    let subcatalogs = document.getElementsByClassName('catalogs');
    console.log(subcatalogs);
    if (subcatalogs.length > 0) {
        subcatalogs[0].style.visibility = 'visible'
        console.log(subcatalogs[0].style.visibility);
    }
}

function onSuperCatalogButtonDeselect() {
    let subcatalogs = document.getElementsByClassName('catalogs');
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
