import React, {useState} from "react";
import {Header} from "../Common/Header/Header.js";
import {Catalog} from "../Common/Catalog/Catalog";
import {getUser} from "../Common/IdProvider";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";
import {Filter} from "../Common/Catalog/Filter";
import {Footer} from "../Common/Footer/Footer";

export function CatalogPage() {
    const user = getUser();
    const [view, setView] = useState(user.view);
    return (
        <div id="page">
            <Header user={getUser()}/>
            <div id="content_wrapper">
                <div className="catalog header">
                    <FilterButton/><CatalogStyleSelector value={view} valueSetter={setView}/>
                </div>
                <div className="main panel">
                    <Catalog type={view}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
