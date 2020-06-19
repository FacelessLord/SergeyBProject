import React from "react";
import {Header} from "../Common/Header/Header.js";
import {Catalog} from "../Common/Catalog/Catalog";
import {getUser} from "../Common/IdProvider";

export function CartPage() {
    return (<div id="page">
        <Header user={getUser()}/>
        <div id="content_wrapper">
            <div className="main panel">
                <span className="catalog header">
                Ваши товары:
                </span>
                <Catalog type={"cart"}/>
            </div>
        </div>
    </div>)
}
