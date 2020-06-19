import React from "react";
import {Link} from "react-router-dom";

export function Category({categoryId, categoryName}) {
    return (<div className="category">
        <Link to={"catalog?category=" + categoryId}>
            <button className="category button">
                {categoryName}
            </button>
        </Link>
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
    for (let value of subcategories) {
        const subcategoryId = value.id;
        const categoryName = value.name;
        l.push(<Category key={categoryId + ":" + subcategoryId} categoryId={categoryId + ":" + subcategoryId}
                         categoryName={categoryName}/>)
    }
    return l
}

export function NestedCategory({categoryId, categoryName, subcategories}) {
    return (<div className="category nested" id={categoryId} onMouseEnter={() => onCatalogButtonSelect(categoryId)}
                 onMouseLeave={() => onCatalogButtonDeselect(categoryId)}>
        <Link to={"catalog?category=" + categoryId} className="category button nested">
            {categoryName}
        </Link>
        <div className="fa fa-angle-right"/>
        <div className="subcatalog">
            {createSubcatalogs(categoryId, subcategories)}
        </div>
    </div>)
}
