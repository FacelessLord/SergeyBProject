import React, {useState} from "react";
import {CatalogOrders} from "../Common/Catalog/CatalogOrders";
import {useAwait} from "../Common/Awaiter";

export function OrdersPage() {
    const [orders, setOrders] = useState({value: {items:[]}})
    const err = "Не удалось загрузить ваши заказы. Попробуйте позже"
    useAwait(orders, setOrders, getOrders, d => d.success !== true, err)
    return (<div id="content_wrapper">
        <div className="site main panel part">
            <h1>{orders.value.type === "super" ? "Текущие заказы": "Ваши заказы"}</h1>
            <CatalogOrders data={orders} type={orders.value.type}/>
        </div>
    </div>)
}

async function getOrders() {
    return await fetch(`/api/orders`,
        {
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .catch(r => "{}")
        .then(t => t.json())
        .then(t => {
            console.log(t)
            return t;
        })
}
