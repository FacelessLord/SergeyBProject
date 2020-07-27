import React from "react";
import {Catalog} from "../Common/Catalog/Catalog";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";

export function CartPage() {
    let filter = {display: true, priceFrom: 0, priceTo: 0, providers: []};
    const setView = v => {
        window.updateUser({view: v});
    };
    const setFilter = f => filter = {...f};
    return (
        <div id="content_wrapper">
            <div className="main panel">
                <div className="catalog header">
                    Ваши товары:
                    <CatalogStyleSelector type={"cart"} value={window.user.view} valueSetter={setView}/>
                </div>
                <Catalog type={"cart"} filter={filter} setFilter={setFilter}/>
            </div>
        </div>)
}
