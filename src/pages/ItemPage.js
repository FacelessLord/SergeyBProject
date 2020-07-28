import React, {useState} from "react";
import {ItemBigCard} from "../Common/Item/ItemBigCard";
import {ItemDescription} from "../Common/Item/ItemDescription";
import {useAwait} from "../Common/Awaiter";


async function getItemData(item) {
    return fetch(`/api/item/data?itemId=${item}`).then(t => t.json())
        .then(async t => {
            t.provider = (await fetch(`/api/providerName?providerId=${t.provider_id}`).then(t => t.json())).name;
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