import React, {useState} from "react";
import {Header} from "../../Common/Header/Header.js";
import {Catalog} from "../../Common/Catalog/Catalog";
import {CatalogStyleSelector} from "../../Common/Catalog/CatalogStyleSelector";

export function CartPage() {
    const [data, setData] = useState({
        filter: {display: true, priceFrom: 0, priceTo: 0, providers: []}
    });
    const setFilter = f => {
        setData({filter: f})
    };
    const setView = v => {
        window.updateUser({view: v});
        setData({view: v, filter: data.filter});
    };
    return (<div id="page">
        <Header/>
        <div id="content_wrapper">
            <div className="main panel">
                <div className="catalog header">
                    Ваши товары:
                    <CatalogStyleSelector type={"cart"} value={data.view} valueSetter={setView}/>
                </div>
                <Catalog type={"cart"} filter={data.filter} setFilter={setFilter}/>
            </div>
        </div>
    </div>)
}
