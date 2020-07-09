import {ItemCard, ItemCardList, ItemCartCard} from "./ItemCard";
import React, {useEffect, useState} from "react";

import {getOrCreateClientId} from "../IdProvider";
import {Awaiter} from "../Awaiter";

export function Catalog({type = "panels", filter}) {
    switch (type) {
        case "list":
            return <CatalogList filter={filter}/>;
        case "cart":
            return <CatalogCart/>;
        default:
            return <CatalogPanels filter={filter}/>;
    }
}

function createItemsPanels(json) {
    const l = [];
    for (let value of json.items) {
        l.push(<ItemCard key={value.cardId} cardId={value.cardId} img={"/api/images/main?id=" + value.cardId}
                         header={value.header}
                         provider={value.provider} price={value.price} inStock={value.inStock ? "Да" : "Нет"}/>)
    }
    return l
}

function createItemsList(json) {
    const l = [];
    for (let value of json.items) {
        l.push(<ItemCardList key={value.cardId} cardId={value.cardId} img={"/api/images/main?id=" + value.cardId}
                             header={value.header}
                             provider={value.provider} price={value.price} inStock={value.inStock ? "Да" : "Нет"}/>)
    }
    return l
}

function createItemsCart(json) {
    const l = [];
    for (let value of json.items) {
        l.push(<ItemCartCard key={value.cardId} cardId={value.cardId} img={"/api/images/main?id=" + value.cardId}
                             header={value.header} price={value.price}/>)
    }
    return l
}

function createFilterQuery(filter) {
    let query = "";
    for (let k in filter) {
        if(k !== "display")
            query += k + "=" + filter[k] + "&";
    }
    return query.slice(0, -1)
}

function requestItems(maxCount, filter, createList) {
    return fetch("/api/items?count=" + maxCount + "&" + createFilterQuery(filter))
        .catch(r => "{}")
        .then(t => t.json())
        .then(t => createList(t))
        .catch(r => [])
}

function getCartItems(createList) {
    return fetch("/api/items/cart?clientId=" + getOrCreateClientId())
        .catch(r => "{}")
        .then(t => t.json())
        .then(createList).catch(r => [])
}

export function CatalogPanels({visible = true, maxCount = 9, filter}) {
    const [items, setItems] = useState("pending");

    useEffect(() => {
        setItems("pending");
    }, [filter]);

    return (<div className={"catalog items pad panels"}>
        <Awaiter value={items} setValue={setItems} getter={() => requestItems(maxCount, filter, createItemsPanels)}
                 err={"Невозможно загрузить каталог"}/>
    </div>);
}


export function CatalogList({visible = true, maxCount = 9, filter}) {
    const [items, setItems] = useState("pending");

    useEffect(() => {
        setItems("pending");
    }, [filter]);

    return (<div className={"catalog items pad list"}>
        <Awaiter value={items} setValue={setItems} getter={() => requestItems(maxCount, filter, createItemsList)}
                 err={"Невозможно загрузить каталог"}/>
    </div>);
}

export function CatalogCart({visible = true}) {
    const [items, setItems] = useState("pending");

    return (<div className={"catalog items pad cart"}>
        <Awaiter value={items} setValue={setItems} getter={() => getCartItems(createItemsCart)}
                 err={"Невозможно загрузить корзину"}/>
    </div>);
}