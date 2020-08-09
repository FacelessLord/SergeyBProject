import React from "react";
import {Link} from "react-router-dom";
import {ItemOrderCard} from "./ItemCard";


export function CatalogOrders({data, type}) {
    if ("err" in data) {
        return data.err
    }
    if (!data.value || !data.value.items || data.value.items.length === 0) {
        return (<div>
            <span>Вы еще ничего не заказали</span><br/>
            <Link to={"/catalog"} className={"catalog buttons button type0 source"}>Перейти в каталог</Link>
        </div>)
    }
    const cartHtml = data.value.items.map((c, i) => <ItemOrderCard type={type} order={c} key={i}/>)
    return (<div className={"catalog items pad list"}>
        {cartHtml}
        <hr/>
    </div>)
}