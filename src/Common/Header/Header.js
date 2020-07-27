import React, {useState} from "react";
import {PanelButtons, UserPanel} from "./UserPanel";

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

export function Header({setCategory}) {
    const [userSelected, setUserSelected] = useState(false);
    return (<div className="header wrapper">
        <div className="header buttons container">
            <div className="header buttons wrapper"
                 onMouseEnter={onSuperCatalogButtonSelect}
                 onMouseLeave={onSuperCatalogButtonDeselect}>
                <Link to={"/catalog"} onClick={() => setCategory("")} className="header buttons button catalog"
                      id="button_catalog">
                    Каталог
                </Link>
                <Categories setCategory={setCategory}/>
            </div>
            <Link to={"/providers"} className="header buttons button providers" id="button_providers">
                Поставщикам
            </Link>
            <Link to={"/cart"} className="header buttons button cart" id="button_cart_main">
                Корзина
            </Link>
        </div>
        <div className="header user container" onMouseEnter={e => onUserSelected(e, userSelected, setUserSelected)}
             onMouseLeave={e => onUserDeselected(e, userSelected, setUserSelected)}>
            <UserPanel/>
            <PanelButtons hidden={!userSelected}/>
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
