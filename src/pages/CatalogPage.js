import React, {useEffect, useState} from "react";
import {Catalog} from "../Common/Catalog/Catalog";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";
import {Filter} from "../Common/Catalog/Filter";

export function CatalogPage({category}) {
    const [filter, setFilter] = useState({display: false, priceFrom: 0, priceTo: 0, providers: []});
    const setView = v => {
        window.updateUser({view: v});
    };
    return (
        <div id="content_wrapper">
            <div className="catalog header">
                <Filter value={filter} setValue={setFilter} category={category}/>
                <CatalogStyleSelector value={window.user.view} valueSetter={setView}/>
            </div>
            <div className="site main panel">
                <Catalog type={window.user.view} category={category} filter={filter}/>
            </div>
        </div>
    )
}
