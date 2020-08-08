import React, {useState} from "react";
import {useAwait} from "../Common/Awaiter";
import {getItemData} from "./ItemPage";
import {ItemEditDescription} from "../Common/Item/ItemEditDescription";
import {ItemEditBigCard} from "../Common/Item/ItemEditBigCard";
import {ImageLoader} from "../Common/ImageLoader";
import {Link} from "react-router-dom";

export function ItemEditPage(props) {
    const itemId = props.match.params.itemId
    const [data, setData] = useState({img_count: -1, success: "pending"})
    const [message, setMessage] = useState("")
    useAwait(data, t => {
        setData(t);
    }, () => getItemData(itemId), d => d.img_count === -1, data.img_count)
    return (<div id="content_wrapper">
        <h2>
            <label htmlFor={"item_name"}>
                Название товара:
            </label>
            <input id={"item_name"} type={"text"}
                   value={data.name} onChange={e => setData({
                ...data,
                name: e.target.value
            })}/>
        </h2>
        <label htmlFor={"category"}>Категория товара: </label>
        <input id={"category"} type={"text"} value={data.category}
               onChange={e => setData({...data, category: e.target.value})}/>
        <div className="site main panel">
            <ItemEditBigCard data={data} setData={setData}/>
            <ImageLoader data={data} setData={setData} productId={itemId}/>
            <ItemEditDescription data={data} setData={setData}/>
            {message ? <div className={"edit account message"} id={"account_message"}>{message}</div> : ""}
            <button className={"edit buttons button type0"} onClick={() => {
                sendData(data, setMessage)
                window.updateCategories()
            }}>Сохранить
            </button>
            <Link to={`/item/${itemId}`} id={"link_return"}> </Link>
        </div>
    </div>)
}

async function sendData(data, setMessage) {
    return await fetch(`/api/items/data`,
        {
            method: "post",
            body: JSON.stringify(data),
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .then(t => t.json())
        .then(j => {
            if (!j.success && j.reason === "nopermission")
                setMessage("У вас нет прав на редактирование товаров")
        })
        .then(n => document.getElementById("link_return").click())
}