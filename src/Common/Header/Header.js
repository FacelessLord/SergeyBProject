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

export function Header({category, setCategory}) {
    const {loggedIn, access_token} = window.user;
    const [userSelected, setUserSelected] = useState(false);
    const setCategoryAndReload = function (newCategory) {
        const newLocation = newCategory ? "?category=" + newCategory : "";
        document.location = "/catalog" + newLocation;
    }
    return (<div className="header wrapper">
        <div className="header buttons container">
            <div className="header buttons wrapper"
                 onMouseEnter={onSuperCatalogButtonSelect}
                 onMouseLeave={onSuperCatalogButtonDeselect}>
                <Link to={"/catalog"} onClick={() => setCategory("")} className="header buttons button catalog" id="button_catalog">
                    Каталог
                </Link>
                <Categories setCategory={setCategory}/>
            </div>
            <Link to={"/providers"} className="header buttons button providers" id="button_providers">
                Поставщикам
            </Link>
            <Link to={"/cart?clientId=" + clientId} className="header buttons button cart" id="button_cart_main">
                Корзина
            </Link>
        </div>
        <div className="header user container" onMouseEnter={e => onUserSelected(e, userSelected, setUserSelected)}
             onMouseLeave={e => onUserDeselected(e, userSelected, setUserSelected)}>
            <UserPanel user={user}/>
            <PanelButtons hidden={!userSelected} user={user}/>
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
