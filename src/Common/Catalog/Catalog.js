import {ItemCard, ItemCardList, ItemCartCard} from "./ItemCard";
import React from "react";
import {Async} from "react-async-await";

import cat1 from "./img/cat1.jpg";
import cat2 from "./img/cat1.jpg"
import cat3 from "./img/cat2.jpeg";
import cat4 from "./img/cat3.jpeg";
import cat5 from "./img/cat5.jpg";
import cat6 from "./img/cat6.jpeg";
import {getOrCreateClientId} from "../IdProvider";

const img = [cat1, cat2, cat3, cat4, cat5, cat6];

export function Catalog({type = "panels"}) {
    switch (type) {
        case "list":
            return <CatalogList/>;
        case "cart":
            return <CatalogCart/>;
        default:
            return <CatalogPanels/>;
    }
}

function createItemsPanels(json) {
    const l = [];
    for (let value in json) {
        l.push(<ItemCard cardId={value.cardId} img={"/api/images/main?id=" + value.cardId} header={value.header}
                         provider={value.provider} price={value.price} inStock={value.inStock ? "Да" : "Нет"}/>)
    }
    return l
}

function createItemsList(json) {
    const l = [];
    for (let value in json) {
        l.push(<ItemCardList cardId={value.cardId} img={"/api/images/main?id=" + value.cardId} header={value.header}
                             provider={value.provider} price={value.price} inStock={value.inStock ? "Да" : "Нет"}/>)
    }
    return l
}

function createItemsCart(json) {
    const l = [];
    for (let value in json) {
        l.push(<ItemCartCard cardId={value.cardId} img={"/api/images/main?id=" + value.cardId}
                             header={value.header} price={value.price}/>)
    }
    return l
}

function getItems(maxCount, createList) {
    return fetch("/api/items?count=" + maxCount)
        .catch(r => "{}")
        .then(t => t.json())
        .then(createList).catch(r => [])
}

function getCartItems(createList) {
    return fetch("/api/items/cart?clientId=" + getOrCreateClientId())
        .catch(r => "{}")
        .then(t => t.json())
        .then(createList).catch(r => [])
}

export function CatalogPanels({visible = true, maxCount = 9}) {
    const items = getItems(maxCount, createItemsPanels);
    if (items.length > 0)
        return (<div className="main pad" style={{visible: visible}}>
            {items}
        </div>);
    return (<div className="main pad" style={{visible: visible}}>Couldn't load catalog</div>);
}

export function CatalogList({visible = true, maxCount = 9}) {
    const items = getItems(maxCount, createItemsList);

    return (<div className="main pad list" style={{visible: visible}}>
        <Async await={items} catch={"Couldn't load catalog"}/>
    </div>);
}

export function CatalogCart({visible = true}) {
    const items = getCartItems(createItemsCart);

    return (<div className="main pad list" style={{visible: visible}}>
        <Async await={items} catch={"Couldn't load catalog"}/>
    </div>);
}
