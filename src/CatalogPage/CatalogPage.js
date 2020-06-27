import React, {useState} from "react";
import {Header} from "../Common/Header/Header.js";
import {Catalog} from "../Common/Catalog/Catalog";
import {getUser} from "../Common/IdProvider";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";
import {Filter} from "../Common/Catalog/Filter";
import {Footer} from "../Common/Footer/Footer";

export function CatalogPage() {
    const user = getUser();
    const [data, setData] = useState({
        view: user.view,
        filter: {display: true, priceFrom: 0, priceTo: 0, providers: []}
    });

    const setFilter = f => setData({view: data.view, filter: f});
    const setView = v => setData({view: v, filter: data.filter});
    return (
        <div id="page">
            <Header user={getUser()}/>
            <div id="content_wrapper">
                <div className="catalog header">
                    <Filter value={data.filter} setValue={setFilter}/>
                    <CatalogStyleSelector value={data.view} valueSetter={setView}/>
                </div>
                <div className="site main panel">
                    <Catalog type={data.view} filter={data.filter} setFilter={setFilter}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
