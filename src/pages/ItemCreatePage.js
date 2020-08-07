import React, {useState} from "react";
import {ItemEditDescription} from "../Common/Item/ItemEditDescription";
import {ItemEditBigCard} from "../Common/Item/ItemEditBigCard";
import {ImageListLoader} from "../Common/ImageLoader";

export function ItemCreatePage(props) {
    const [data, setData] = useState({
        img_count: -1,
        success: "pending",
        category: "",
        name: "",
        images: [],
        price: 0,
        provider: "",
        in_stock: false,
        description: ""
    })
    const [message, setMessage] = useState("")
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
            <ItemEditBigCard data={data} setData={setData} noimage/>
            <ImageListLoader data={data.images} setData={i => setData({...data, images: i})}/>
            <ItemEditDescription data={data} setData={setData}/>
            {message ? <div className={"edit account message"} id={"account_message"}>{message}</div> : ""}
            <button className={"edit buttons button type0"} onClick={() => sendData(data, setMessage)}>Сохранить
            </button>
        </div>
    </div>)
}

async function sendData(data, setMessage) {
    await fetch(`/api/items/create`,
        {
            method: "put",
            body: JSON.stringify(data),
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .then(t => t.json())
        .then(j => {
            if (!j.success && j.reason === "nopermission")
                setMessage("У вас нет прав на редактирование товаров")
        })
}