import React from "react";
import {Header} from "../Common/Header/Header.js"
import {ResourceDescription} from "./ResourceDescription";
import {Catalog} from "../Common/Catalog/Catalog";
import {Link} from "react-router-dom";
import {Footer} from "../Common/Footer/Footer";


export function MainPage({category}) {
    return (<div id="content_wrapper">
        <div className="site main panel">
            <ResourceDescription/>
            <Catalog type={window.user.view} category={category}/>
            <Link to={"/catalog"} className="catalog buttons button more">
                Показать полностью
            </Link>
        </div>
    </div>)
}


