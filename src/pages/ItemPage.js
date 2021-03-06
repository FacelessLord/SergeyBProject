import React, {useState} from "react";
import {ItemBigCard} from "../Common/Item/ItemBigCard";
import {ItemDescription} from "../Common/Item/ItemDescription";
import {useAwait} from "../Common/Awaiter";


export async function getItemData(item) {
    return fetch(`/api/items/data?itemId=${item}`).then(t => t.json())
        .then(async t => {
            const value = t.value
            t.value = undefined
            t = {...t, ...value}
            t.provider = (await fetch(`/api/providers/name?providerId=${t.provider_id}`).then(t => t.json())).value;
            return t
        })
}

export function ItemPage(props) {
    const itemId = props.match.params.itemId
    const [itemName, setItemName] = useState("Товар")
    const [data, setData] = useState({img_count: -1, success: "pending"})
    useAwait(data, t => {
        setData(t);
        setItemName(t.name ?? "");
    }, () => getItemData(itemId), d => d.img_count === -1)
    return (<div id="content_wrapper">
        <h2 id={"item_name"}>{itemName}</h2>
        <div className="main panel">
            <ItemBigCard data={data}/>
            <ItemDescription item={itemId} data={data}/>
        </div>
    </div>)
}