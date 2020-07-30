import {ItemCard, ItemCardList} from "./ItemCard";
import React, {useEffect, useState} from "react";

import {Awaiter} from "../Awaiter";

export function Catalog({type = "panels", filter, category}) {
    switch (type) {
        case "list":
            return <CatalogList filter={filter} category={category}/>;
        default:
            return <CatalogPanels filter={filter} category={category}/>;
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

function createFilterQuery(filter) {//display: false, priceFrom: 0, priceTo: 0, providers: []
    const priceFromParam = filter.priceFrom ? `&priceFrom=${filter.priceFrom}` : "";
    const priceToParam = filter.priceTo ? `&priceTo=${filter.priceTo}` : "";
    const providersParam = filter.providers.length > 0 ? `&providers=${filter.providers}` : "";
    return priceFromParam + priceToParam + providersParam;
}

function requestItems(maxCount, filter, createList, category) {
    return fetch("/api/items?count=" + maxCount + (category ? "&category=" + category : "") + createFilterQuery(filter))
        .catch(() => "{}")
        .then(t => t.json())
        .then(async t => {
            for (let i = 0; i < t.items.length; i++) {
                t.items[i].provider = (await fetch(`/api/providerName?providerId=${t.items[i].provider}`).then(t => t.json())).name
            }
            return t
        })
        .then(t => createList(t))
        .catch(r => [])
}

export function CatalogPanels({maxCount = 9, filter, category}) {
    const [items, setItems] = useState("pending");

    useEffect(() => {
        setItems("pending");
    }, [filter, category]);

    return (<div className={"catalog items pad panels"}>
        <Awaiter value={items} setValue={setItems}
                 getter={() => requestItems(maxCount, filter, createItemsPanels, category)}
                 err={"Невозможно загрузить каталог"} deps={[filter]}/>
    </div>);
}


export function CatalogList({maxCount = 9, filter, category}) {
    const [items, setItems] = useState("pending");

    useEffect(() => {
        setItems("pending");
    }, [filter, category]);

    return (<div className={"catalog items pad list"}>
        <Awaiter value={items} setValue={setItems}
                 getter={() => requestItems(maxCount, filter, createItemsList, category)}
                 err={"Невозможно загрузить каталог"} deps={[filter]}/>
    </div>);
}