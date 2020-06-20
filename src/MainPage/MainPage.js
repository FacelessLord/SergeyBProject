import React, {useState} from "react";
import {Header} from "../Common/Header/Header.js"
import {ResourceDescription} from "./ResourceDescription";
import {Catalog} from "../Common/Catalog/Catalog";
import {getUser} from "../Common/IdProvider";
import {Link} from "react-router-dom";
import {Footer} from "../Common/Footer/Footer";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";
import {FilterButton} from "../Common/Catalog/FilterButton";


export function MainPage() {
    const user = getUser();
    const [view, setView] = useState(user.view);
    return (
        <div id="page">
            <Header user={user}/>
            <div id="content_wrapper">
                <div className="main panel">
                    <ResourceDescription/>
                    <div className="catalog header">
                        <FilterButton/><CatalogStyleSelector value={view} valueSetter={setView}/>
                    </div>
                    <Catalog type={view}/>
                    <Link to={"/catalog"} className="main button more">
                        Показать полностью
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
