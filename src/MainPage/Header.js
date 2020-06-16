import React from "react";
import {Category, NestedCategory} from "./Category";
import {GuestPanelButtons, UserPanel, UserPanelButtons} from "./UserPanel";

import '../styles/header_styles.css';
import {Abutton} from "./AButton";

function onSuperCatalogButtonSelect() {
    let subcatalogs = document.getElementsByClassName('catalogs');
    console.log(subcatalogs + "2");
    if (subcatalogs.length > 0) {
        subcatalogs[0].style.visibility = 'visible'
    }
}

function onSuperCatalogButtonDeselect() {
    let subcatalogs = document.getElementsByClassName('catalogs');
    if (subcatalogs.length > 0) {
        subcatalogs[0].style.visibility = 'hidden'
    }
}


export function Header({loggedIn, username, clientId}) {
    const userRecord = {loggedIn, username, clientId};
    return (<div id="header_wrapper">
        <div className="header background">
            <div className="header buttons">
                <div className="header button wrapper"
                     onMouseEnter={onSuperCatalogButtonSelect}
                     onMouseLeave={onSuperCatalogButtonDeselect}>
                    <Abutton className="header button" id="button_catalog"
                             href="/catalog">
                        Каталог
                    </Abutton>
                    <div className="catalogs" id="catalog_buttons">
                        <Category categoryId={"aaaaaa"} categoryName={"AAAAAA"}/>
                        <NestedCategory categoryId={"bbbbbb"} categoryName={"BBBBBB"} subcategories={[
                            {"categoryId": "a", "categoryName": "BBBBBBA"},
                            {"categoryId": "b", "categoryName": "BBBBBBB"},
                            {"categoryId": "c", "categoryName": "BBBBBBC"},
                            {"categoryId": "d", "categoryName": "BBBBBBD"},
                        ]}/>

                        <Category categoryId={"cccccc"} categoryName={"CCCCCC"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <NestedCategory categoryId={"eeeeee"} categoryName={"EEEEEE"} subcategories={[
                            {"categoryId": "a", "categoryName": "EEEEEEA"},
                            {"categoryId": "b", "categoryName": "EEEEEEB"},
                            {"categoryId": "c", "categoryName": "EEEEEEC"},
                            {"categoryId": "d", "categoryName": "EEEEEED"},
                        ]}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>
                        <Category categoryId={"dddddd"} categoryName={"DDDDDD"}/>

                    </div>
                </div>
                <Abutton className="header button" id="button_providers" href="/providers">
                    Поставщикам
                </Abutton>
                <Abutton className="header button" id="button_cart_main" href={"/cart?clientId=" + clientId}>
                    Корзина
                </Abutton>
            </div>
            <span className="user">
                <UserPanel user={userRecord}/>
                <UserPanelButtons hidden={!loggedIn} user={userRecord}/>
                <GuestPanelButtons hidden={loggedIn}/>
            </span>
        </div>
    </div>)
}
