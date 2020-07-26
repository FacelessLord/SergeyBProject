import React from "react";
import {Header} from "../Common/Header/Header.js";
import {Catalog} from "../Common/Catalog/Catalog";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";
import {Footer} from "../Common/Footer/Footer";

export function CartPage({setCategory}) {
    let filter = {display: true, priceFrom: 0, priceTo: 0, providers: []};
    const setView = v => {
        window.updateUser({view: v});
    };
    const setFilter = f => filter = {...f};
    return (<div id="page">
        <Header setCategory={setCategory}/>
        <div id="content_wrapper">
            <div className="main panel">
                <div className="catalog header">
                    Ваши товары:
                    <CatalogStyleSelector type={"cart"} value={window.user.view} valueSetter={setView}/>
                </div>
                <Catalog type={"cart"} filter={filter} setFilter={setFilter}/>
            </div>
        </div>
        <Footer/>
    </div>)
}
