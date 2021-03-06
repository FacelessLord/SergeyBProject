import React, {useState} from "react";
import {OrderItems} from "../Common/Catalog/OrderItems";
import {useAwait} from "../Common/Awaiter";
import {fetchWithAuth} from "../Common/Utils";

export function OrderPage(props) {
    const orderId = props.match.params.orderId
    console.log(props.match.params)
    console.log(orderId)
    const [order, setOrder] = useState({value: {order: {batches: []}}})
    const err = "Не удалось загрузить заказ. Попробуйте позже"
    useAwait(order, setOrder, () => getOrder(orderId), d => d.success !== true, err)
    console.log(order)
    return (
        <div id="content_wrapper">
            <div className="site main panel part">
                <h1 style={{marginBottom: "-16px"}}>Заказ от {order.value.order.date_created}</h1>
                {order.value.type === "super" ? <h4>Заказчик: {order.value.order.customer_username}<br/>
                    Имя клиента: {order.value.order.customer_name}<br/>
                    Телефон: {order.value.order.customer_phone}</h4> : ""}
                <OrderItems order={order.value.order}/>
            </div>
        </div>
    )
}

async function getOrder(id) {
    return await fetchWithAuth(`/api/order?orderId=${id}`,
        {
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .catch(r => {
        })
}