import React, {useState} from "react";
import {OrderItems} from "../Common/Catalog/OrderItems";
import {useAwait} from "../Common/Awaiter";

export function OrderPage(props) {
    const orderId = props.match.params.orderId
    console.log(props.match.params)
    console.log(orderId)
    const [order, setOrder] = useState({value: []})
    const err = "Не удалось загрузить заказ. Попробуйте позже"
    useAwait(order, setOrder, () => getOrder(orderId), d => d.success !== true, err)
    return (
        <div id="content_wrapper">
            <div className="site main panel part">
                <h1>Заказ от {order.value.date_created}</h1>
                <OrderItems order={order}/>
            </div>
        </div>
    )
}

async function getOrder(id) {
    return await fetch(`/api/order?orderId=${id}`,
        {
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .catch(r => "{}")
        .then(t => t.json())
}