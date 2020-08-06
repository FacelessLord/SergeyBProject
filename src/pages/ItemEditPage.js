import React, {useState} from "react";
import {useAwait} from "../Common/Awaiter";
import {getItemData} from "./ItemPage";
import {ItemEditDescription} from "../Common/Item/ItemEditDescription";
import {ItemEditBigCard} from "../Common/Item/ItemEditBigCard";
import {ImageLoader} from "../Common/ImageLoader";

export function ItemEditPage(props) {
    const itemId = props.match.params.itemId
    const [data, setData] = useState({img_count: -1, success: "pending"})
    useAwait(data, t => {
        setData(t);
    }, () => getItemData(itemId), d => d.img_count === -1, data.img_count)
    return (<div id="content_wrapper">
        <h2 id={"item_name"}><input type={"text"} value={data.name} onChange={e => setData({...data, name: e.target.value})}/></h2>
        <input id={"category"} type={"text"} value={data.category} onChange={e => setData({...data, category: e.target.value})}/>
        <div className="site main panel">
            <ItemEditBigCard data={data} setData={setData}/>
            <ImageLoader data={data} setData={setData} productId={itemId}/>
            <ItemEditDescription item={itemId} data={data} setData={setData}/>
            <button className={"edit buttons button type0"} onClick={() => sendData(data)}>Сохранить</button>
        </div>
    </div>)
}

async function sendData(data) {
    await fetch(`/api/items/data?username${window.user.username}&accessToken=${window.user.accessToken}`,
        {
            method: "post",
            body: JSON.stringify(data)
        })
        .then(t => t.json())
}