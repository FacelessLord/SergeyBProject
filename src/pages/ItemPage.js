import {Header} from "../Common/Header/Header";
import {AccountForm} from "../Common/Account/AccountForm";
import {EditAccountButton} from "../Common/Account/EditAccountButton";
import {Footer} from "../Common/Footer/Footer";
import React, {useState} from "react";
import {ItemBigCard} from "../Common/Item/ItemBigCard";
import {ItemDescription} from "../Common/Item/ItemDescription";


export function ItemPage(props) {
    const itemId = props.match.params.itemId
    const [itemName, setItemName] = useState("Товар")
    return (<div id="content_wrapper">
        <h2 id={"item_name"}>{itemName}</h2>
        <div className="main panel">
            <ItemBigCard item={itemId} setItemName={setItemName}/>
            <ItemDescription item={itemId}/>
        </div>
    </div>)
}