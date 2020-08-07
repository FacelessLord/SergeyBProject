import React, {useState} from "react";
import {useAwaitWrap} from "../Awaiter";
import {Link} from "react-router-dom";
import {ItemCartCard} from "./ItemCard";


export function CatalogCart({type}) {
    const [cart, setCart] = useState({"items": []})
    return useAwaitWrap(cart, setCart, getCart, d => d.success !== true, data => wrapCart(data, type), "Не удалось загрузить корзину. Попробуйте позже")
}

async function getCart() {
    return await fetch(`/api/cart`,
        {
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .catch(r => "{}")
        .then(t => t.json())
        .then(async t => {
            if (t.success) {
                for (let i of t.value)
                    i.provider = (await fetch(`/api/providers/name?providerId=${i.provider_id}`).then(t => t.json())).value
                let summary = 0
                let count = 0
                for (let i of t.value) {
                    summary += i.summary
                    count += i.amount;
                }
                const summaryStr = `${summary}`;
                const pointIndex = summaryStr.indexOf('.');
                t.summary = summaryStr.slice(0, Math.min(pointIndex + 3, summaryStr.length));
                t.count = count
            }
            return t
        })
}

async function orderCart() {
    await fetch(`/api/cart/order`, {
        method: "POST",
        headers: {accessToken: window.user.accessToken, username: window.user.username}
    })
}

function wrapCart(data, type) {
    const cart = data.value;
    if ("err" in data) {
        return data.err
    }
    if (cart.length === 0) {
        return (<div>
            <span>Вы еще ничего не добавили в корзину</span><br/>
            <Link to={"/catalog"} className={"catalog buttons button type0 source"}>Перейти в каталог</Link>
        </div>)
    }
    const cartHtml = cart.map((c, i) => <ItemCartCard batchId={c.batchId} type={type} key={i} cardId={c.cardId}
                                                      img={"/api/images/main?id=" + c.cardId}
                                                      header={c.header} price={c.price} provider={c.provider}
                                                      summary={c.summary} amount={c.amount}/>)
    return (<div className={"catalog items pad " + type}>
        {cartHtml}
        <hr/>
        <div className={"catalog summary form"}>
            <div className={"catalog summary value"}>
                <div>Товаров:</div>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . .
                . . . . . . . . . . . . . . . . . . . . . .
                <div>{data.count} шт</div>
            </div>
            <div className={"catalog summary value"}>
                <div>Итого:</div>
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . .
                . . . . . . . . . . . . . . . . . . . . . .
                <div>{data.summary} ₽</div>
            </div>
            <button className={"catalog buttons button type0 order"} onClick={orderCart}>Заказать</button>
        </div>
    </div>)
}