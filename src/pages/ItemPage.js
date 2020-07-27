import {Header} from "../Common/Header/Header";
import {AccountForm} from "../Common/Account/AccountForm";
import {EditAccountButton} from "../Common/Account/EditAccountButton";
import {Footer} from "../Common/Footer/Footer";
import React, {useEffect, useState} from "react";
import {ItemBigCard} from "../Common/Item/ItemBigCard";
import {ItemDescription} from "../Common/Item/ItemDescription";


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
    useEffect(() => {
        if (data.img_count === -1)
            getItemData(itemId).then(t => {
                setData(t);
                setItemName(t.name);
            }).catch(r => setData({}))
    })
    return (<div id="content_wrapper">
        <h2 id={"item_name"}>{itemName}</h2>
        <div className="main panel">
            <ItemBigCard data={data}/>
            <ItemDescription item={itemId} data={data}/>
        </div>
    </div>)
}