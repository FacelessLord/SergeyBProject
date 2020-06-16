import React from "react";
import {Abutton} from "./AButton";

export function Category({categoryId, categoryName}) {
    return (<div className="category">
        <Abutton className="category button" href={"catalog?category=" + categoryId}>
            {categoryName}
        </Abutton>
    </div>)
}

function onCatalogButtonSelect(id) {
    let container = document.getElementById(id);
    container.style.zIndex = '10';
    let subcatalogs = container.getElementsByClassName('subcatalog');
    subcatalogs[0].style.backgroundColor = '#BDBDBD';
    if (subcatalogs.length > 0) {
        subcatalogs[0].style.visibility = 'visible'
    }
}

function onCatalogButtonDeselect(id) {
    let container = document.getElementById(id);
    container.style.zIndex = '3';
    let subcatalogs = container.getElementsByClassName('subcatalog');
    if (subcatalogs.length > 0) {
        subcatalogs[0].style.visibility = 'hidden'
    }
}

function createSubcatalogs(categoryId, subcategories) {
    let l = [];
    for (let i = 0; i < subcategories.length; i++) {
        const subcategoryId = subcategories[i].categoryId;
        const categoryName = subcategories[i].categoryName;
        l.push(<Category key={i} categoryId={categoryId + ":" + subcategoryId} categoryName={categoryName}/>)
    }
    return l
}

export function NestedCategory({categoryId, categoryName, subcategories}) {
    return (<div className="category nested" id={categoryId} onMouseEnter={() => onCatalogButtonSelect(categoryId)}
                 onMouseLeave={() => onCatalogButtonDeselect(categoryId)}>
        <Abutton className="category button" href={"catalog?category=" + categoryId}>
            {categoryName}
        </Abutton>
        <div className="fa fa-angle-right"/>
        <div className="subcatalog">
            {createSubcatalogs(categoryId, subcategories)}
        </div>
    </div>)
}
