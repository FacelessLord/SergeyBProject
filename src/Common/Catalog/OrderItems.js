import React from "react";
import {Link} from "react-router-dom";
import {ItemCartCard} from "./ItemCard";


export function OrderItems({order}) {
    return wrapOrder(order)
}


function wrapOrder(data) {
    console.log(data)
    if (data.err) {
        return data.err
    }
    if (!data.value || !data.value.batches || data.value.batches.length === 0) {
        console.log("empty")
        return (<div>
            <span>Данный заказ пуст</span><br/>
            <Link to={"/catalog"} className={"catalog buttons button type0 source"}>Перейти в каталог</Link>
        </div>)
    }
    const orderHtml = data.value.batches.map((c, i) => <ItemCartCard batchId={c.batchId} type={"list"} key={i}
                                                                     cardId={c.cardId}
                                                                     img={"/api/images/main?id=" + c.cardId}
                                                                     header={c.header} price={c.price}
                                                                     provider={c.provider}
                                                                     summary={c.summary} amount={c.amount}/>)
    return (<div className={"catalog items pad list"}>
        {orderHtml}
        <hr/>
        <div className={"catalog summary form"}>
            <div className={"catalog summary value"}>
                <div>Товаров:</div>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . .
                <div>{data.value.count} шт</div>
            </div>
            <div className={"catalog summary value"}>
                <div>Итого:</div>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . .
                <div>{data.value.summary} ₽</div>
            </div>
        </div>
    </div>)
}