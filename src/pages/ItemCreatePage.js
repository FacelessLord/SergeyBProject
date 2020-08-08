import React, {useState} from "react";
import {ItemEditDescription} from "../Common/Item/ItemEditDescription";
import {ItemEditBigCard} from "../Common/Item/ItemEditBigCard";
import {ImageListLoader} from "../Common/ImageLoader";

export function ItemCreatePage(props) {
    let reader = new FileReader();
    const [data, setData] = useState({
        img_count: -1,
        success: "pending",
        category: "",
        name: "",
        images: [],
        price: 0,
        provider: "",
        in_stock: false,
        description: "",
        images_loaded: []
    })
    data.images_loaded.push(reader.result)
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
            <ImageListLoader data={data.images} setData={i => {
                reader.onloadend = () => {
                    if (reader.result) {
                        setData({
                            ...data,
                            images_loaded: [...data.images_loaded, reader.result],
                            images: i
                        })
                    } else {
                        setData({
                            ...data,
                            images: i
                        })
                    }
                }
                reader.readAsDataURL(i.slice(-1)[0]);
            }}/>
            <ItemEditDescription data={data} setData={setData}/>
            {message ? <div className={"edit account message"} id={"account_message"}>{message}</div> : ""}
            <button className={"edit buttons button type0"} onClick={() => {
                sendData(data, setMessage)
                window.updateCategories()
            }}>Сохранить
            </button>
        </div>
    </div>)
}

async function sendData(data, setMessage) {
    for (let i = 0; i < data.images_loaded.length; i++) {
        if (!data.images_loaded[i]) {
            data.images_loaded.splice(i, 1)
            i--;
        }
    }
    return await fetch(`/api/items/create`,
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