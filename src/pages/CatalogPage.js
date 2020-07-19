import React, {useState} from "react";
import {Header} from "../Common/Header/Header.js";
import {Catalog} from "../Common/Catalog/Catalog";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";
import {Filter} from "../Common/Catalog/Filter";
import {Footer} from "../Common/Footer/Footer";

export function CatalogPage({category, setCategory}) {
    const [filter, setFilter] = useState({display: false, priceFrom: 0, priceTo: 0, providers: []});
    const setView = v => {
        window.updateUser({view: v});
    };
    return (
        <div id="page">
            <Header category={category} setCategory={setCategory}/>
            <div id="content_wrapper">
                <div className="catalog header">
                    <Filter value={filter} setValue={setFilter}/>
                    <CatalogStyleSelector value={window.user.view} valueSetter={setView}/>
                </div>
                <div className="site main panel">
                    <Catalog type={window.user.view} category={category} filter={filter} setFilter={setFilter}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
