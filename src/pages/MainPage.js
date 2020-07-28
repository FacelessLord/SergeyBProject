import React from "react";
import {ResourceDescription} from "./ResourceDescription";
import {Catalog} from "../Common/Catalog/Catalog";
import {Link} from "react-router-dom";


export function MainPage({category}) {
    return (<div id="content_wrapper">
        <div className="site main panel">
            <ResourceDescription/>
            <Catalog type={window.user.view} category={category} filter={{display: false, priceFrom: 0, priceTo: 0, providers: []}}/>
            <Link to={"/catalog"} className="catalog buttons button more">
                Показать полностью
            </Link>
        </div>
    </div>)
}


