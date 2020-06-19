import React from "react";
import {Header} from "../Common/Header/Header.js"
import {ResourceDescription} from "./ResourceDescription";
import {Catalog} from "../Common/Catalog/Catalog";
import {getUser} from "../Common/IdProvider";
import {Link} from "react-router-dom";


export function MainPage() {
    return (
        <div id="page">
            <Header user={getUser()}/>
            <div id="content_wrapper">
                <div className="main panel">
                    <ResourceDescription/>
                    <span className="catalog header">
                    Каталог:
                    </span>
                    <Catalog type={"list"}/>
                    <Link to={"/catalog"} className="main button more">
                        Показать полностью
                    </Link>
                </div>
            </div>
        </div>
    )
}
