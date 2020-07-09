import React, {useState} from "react";
import {Header} from "../Common/Header/Header.js";
import {Catalog} from "../Common/Catalog/Catalog";
import {getUser} from "../Common/IdProvider";
import {Filter} from "../Common/Catalog/Filter";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";

export function CartPage() {
    const user = getUser();
    const [data, setData] = useState({
        view: user.view,
        filter: {display: true, priceFrom: 0, priceTo: 0, providers: []}
    });
    const setFilter = f => {};
    const setView = v => setData({view: v, filter: data.filter});
    return (<div id="page">
        <Header user={user}/>
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
