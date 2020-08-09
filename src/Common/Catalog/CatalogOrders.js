import React, {useState} from "react";
import {useAwaitWrap} from "../Awaiter";
import {Link} from "react-router-dom";
import {ItemOrderCard} from "./ItemCard";


export function CatalogOrders({}) {
    const [orders, setOrders] = useState({"items": []})
    const err = "Не удалось загрузить ваши заказы. Попробуйте позже"
    const callUpdate = () => getOrders().then(setOrders).catch(r => setOrders(err))
    return useAwaitWrap(orders, setOrders, getOrders, d => d.success !== true,
        data => wrapOrders(data, callUpdate),
        err)
}

async function getOrders() {
    return await fetch(`/api/orders`,
        {
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .catch(r => "{}")
        .then(t => t.json())
}


function wrapOrders(data, callUpdate) {
    const cart = data.value;
    if ("err" in data) {
        return data.err
    }
    if (cart.length === 0) {
        return (<div>
            <span>Вы еще ничего не заказали</span><br/>
            <Link to={"/catalog"} className={"catalog buttons button type0 source"}>Перейти в каталог</Link>
        </div>)
    }
    const cartHtml = cart.map((c, i) => <ItemOrderCard order={c} key={i} callUpdate={callUpdate}/>)
    return (<div className={"catalog items pad list"}>
        {cartHtml}
        <hr/>
    </div>)
}