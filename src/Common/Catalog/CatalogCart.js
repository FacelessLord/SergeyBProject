import React, {useState} from "react";
import {useAwaitWrap} from "../Awaiter";
import {Link} from "react-router-dom";
import {ItemCartCard} from "./ItemCard";


export function CatalogCart({type}) {
    const [cart, setCart] = useState({"items": []})
    return useAwaitWrap(cart, setCart, getCart, d => d.success !== true, data => wrapCart(data, type), "Не удалось загрузить корзину. Попробуйте позже")
}

async function getCart() {
    return await fetch(`/api/items/cart?accessToken=${window.user.accessToken}&username=${window.user.username}`)
        .catch(r => "{}")
        .then(t => t.json())
        .then(t => {
            if (t.success) {
                t.items.map(async v => v.provider = (await fetch(`/api/providerName?providerId=${v.provider_id}`).then(t => t.json())).name)
            }
            return t
        })
}

function wrapCart(data, type) {
    const cart = data.items;
    if ("err" in data) {
        return data.err
    }
    if (cart.length === 0) {
        return (<div>
            <span>Вы еще ничего не добавили в корзину</span><br/>
            <Link to={"/catalog"} className={"catalog buttons button source"}>Перейти в каталог</Link>
        </div>)
    }
    const cartHtml = cart.map((c, i) => <ItemCartCard type={type} key={i} cardId={c.cardId}
                                                      img={"/api/images/main?id=" + c.cardId}
                                                      header={c.header} price={c.price} provider={c.provider}
                                                      summary={c.summary} amount={c.amount}/>)
    return (<div className={"catalog items pad " + type}>
        {cartHtml}
    </div>)
}