import React from "react";
import {ResourceDescription} from "./ResourceDescription";
import {Catalog} from "../Common/Catalog/Catalog";
import {Link} from "react-router-dom";


export function MainPage({category}) {
    return (<div id="content_wrapper">
        <div className="site main panel part">
            <ResourceDescription/>
            <Catalog type={window.user.view} category={category} filter={{display: false, priceFrom: 0, priceTo: 0, providers: []}}/>
            <Link to={"/catalog"} className="catalog buttons button type0 more">
                Показать полностью
            </Link>
        </div>
    </div>)
}


