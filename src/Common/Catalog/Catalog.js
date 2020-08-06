import {ItemCard, ItemCardList} from "./ItemCard";
import React, {useEffect, useState} from "react";

import {Awaiter, useAwaitWrap} from "../Awaiter";

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
    for (let value of json.value) {
        l.push(<ItemCard key={value.cardId} cardId={value.cardId} img={"/api/images/main?id=" + value.cardId}
                         header={value.header}
                         provider={value.provider} price={value.price} inStock={value.inStock ? "Да" : "Нет"}/>)
    }
    return l
}

function createItemsList(json) {
    const l = [];
    for (let value of json.value) {
        l.push(<ItemCardList key={value.cardId} cardId={value.cardId} img={"/api/images/main?id=" + value.cardId}
                             header={value.header}
                             provider={value.provider} price={value.price} inStock={value.inStock ? "Да" : "Нет"}/>)
    }
    return (<div className={"catalog items pad list"}>
        {l}
    </div>)
}

function createFilterQuery(filter) {//display: false, priceFrom: 0, priceTo: 0, providers: []
    const priceFromParam = filter.priceFrom ? `&priceFrom=${filter.priceFrom}` : "";
    const priceToParam = filter.priceTo ? `&priceTo=${filter.priceTo}` : "";
    const providersParam = filter.providers.length > 0 ? `&providers=${filter.providers}` : "";
    return priceFromParam + priceToParam + providersParam;
}

async function requestItems(maxCount, filter, category) {
    return await fetch("/api/items?count=" + maxCount + (category ? "&category=" + category : "") + createFilterQuery(filter))
        .catch(() => "{}")
        .then(t => t.json())
        .then(async t => {
            console.log("req")
            for (let i = 0; i < t.value.length; i++) {
                t.value[i].provider = (await fetch(`/api/providers/name?providerId=${t.value[i].provider}`).then(t => t.json())).name
            }
            return t
        })
}

export function CatalogPanels({maxCount = 9, filter, category}) {
    const [items, setItems] = useState("pending");

    useEffect(() => {
        setItems("pending");
    }, [filter, category]);

    return useAwaitWrap(items, setItems, () => requestItems(maxCount, filter, category),
            i => i === "pending", createItemsPanels, "Невозможно загрузить каталог", [filter, category])
}


export function CatalogList({maxCount = 9, filter, category}) {
    const [items, setItems] = useState("pending");

    useEffect(() => {
        setItems("pending");
    }, [filter, category]);
    return useAwaitWrap(items, setItems, async () => await requestItems(maxCount, filter, category),
            i => i === "pending", createItemsList, "Невозможно загрузить каталог", [filter, category])
}