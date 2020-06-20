import React from "react";
import {Header} from "../Common/Header/Header.js";
import {Catalog} from "../Common/Catalog/Catalog";
import {getUser} from "../Common/IdProvider";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";

export function CatalogPage() {
    return (
        <div id="page">
            <Header user={getUser()}/>
            <div id="content_wrapper">
                <span className="catalog header">
                Каталог:<CatalogStyleSelector/>
                </span>
                <div className="main panel">
                    <Catalog type={"list"}/>
                </div>
            </div>
        </div>
    )
}
