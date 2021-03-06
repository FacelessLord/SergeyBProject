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

export function Header({setCategory, categoryMonitor}) {
    const [userSelected, setUserSelected] = useState(false);
    return (<div className="header wrapper">
        <div className="header buttons container">
            <Link to="/" className="header buttons button type1 fa fa-home"/>
            <div className="header buttons wrapper"
                 onMouseEnter={onSuperCatalogButtonSelect}
                 onMouseLeave={onSuperCatalogButtonDeselect}>
                <Link to={"/catalog"} onClick={() => setCategory("")}
                      className="header buttons button type1 catalogButton"
                      id="button_catalog">
                    Каталог
                </Link>
                <Categories setCategory={setCategory} categoryMonitor={categoryMonitor}/>
            </div>
            <Link to={"/about"} className="header buttons button type1 about" id="button_about">
                О нас
            </Link>
            <Link to={"/cart"} className="header buttons button type1 cart" id="button_cart_main">
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
