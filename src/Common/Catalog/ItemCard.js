import React from "react";
import {Link} from "react-router-dom";

export function ItemCard({cardId, img, header, provider, price, inStock}) {
    return (<Link className="catalog items item card" to={"item/" + cardId} id={cardId}>
        <img className="catalog items item img" src={img} alt={"Картинка товара"}/>
        <span className="catalog items item text main">{header}</span>
        <div className="catalog items item text attributes">
            <span className="catalog items item text provider">
              Изготовитель: {provider}
            </span><br/>
            <span className="catalog items item text price">
              Цена: {price}₽
            </span><br/>
            <span className="catalog items item text stock">
              В наличии: {inStock}
            </span><br/>
        </div>
    </Link>)
}

export function ItemCardList({cardId, img, header, provider, price, inStock}) {
    return (<Link className="catalog items item card" to={"item/" + cardId} id={cardId}>
        <img className="catalog items item img" src={img} alt={"Product main icon"}/>
        <div className="catalog items item info">
            <span className="catalog items item text main">{header}</span>
            <div className="catalog items item text attributes">
              <span className="catalog items item text provider">
                Изготовитель: {provider}
              </span><br/>
                <span className="catalog items item text price">
                Цена: {price}₽
              </span><br/>
                <span className="catalog items item text stock">
                В наличии: {inStock}
              </span><br/>
            </div>
        </div>
    </Link>)
}

function ending(count) {
    const mod = count % 100
    if ((mod > 10 && mod < 20) || (mod % 10 > 4)) {
        return 'ов'
    }
    if (mod % 10 === 1) {
        return ''
    }
    if(mod % 10 > 1 && mod % 10 < 5){
        return 'а'
    }
}

export function ItemOrderCard({order}) {
    // "orderId":
    // "firstItemId":
    // "summary":
    // "count":
    // "date_created":
    return (<Link className="catalog items item card" to={"/order/" + order.orderId} id={order.orderId}>
        <img className="catalog items item img" src={"/api/images/main?id=" + order.firstItemId} alt={"Order icon"}/>
        <div className="catalog items item info">
            <span className="catalog items item text main">Заказ от {order.date_created}</span>
            <div className="catalog items item text attributes">
              <span className="catalog items item text count">
                {order.count} товар{ending(order.count)}
              </span><br/>
                <span className="catalog items item text summary">
                Стоимость: {order.summary} ₽
              </span><br/>
            </div>
        </div>
    </Link>)
}

export function ItemCartCard({batchId, type, cardId, img, header, provider, price, summary, amount, callUpdate, disableRemove}) {
    switch (type) {
        case "list":
            return (<CartListItem batchId={batchId} cardId={cardId} header={header} img={img} amount={amount}
                                  price={price} provider={provider} summary={summary} callUpdate={callUpdate}/>)
        default:
            return (<CartPanelItem batchId={batchId} cardId={cardId} header={header} img={img} amount={amount}
                                   price={price} provider={provider} summary={summary} callUpdate={callUpdate}/>)
    }
}

export function CartPanelItem({batchId, cardId, img, header, provider, price, summary, amount, callUpdate}) {
    return (<div className="catalog items item card" to={"item/" + cardId} id={cardId}>
        <Link to={"item/" + cardId} id={cardId} style={{padding: '0px', display: "contents"}}>
            <img className="catalog items item img" src={img} alt={"Картинка товара"}/>
        </Link>
        <div className={"catalog item card form"}>
            <Link to={"item/" + cardId} id={cardId} style={{padding: '0px', display: "flex", flexDirection: "column"}}>
                <span className="catalog items item text main">{header}</span>
                <div className="catalog items item text attributes">
                <span className="catalog items item text provider">
                  Изготовитель: {provider}
                </span><br/>
                    <span className="catalog items item text price">
                  Цена: {price} ₽
                </span><br/>
                    <span className="catalog items item text amount">
                  Количество: {amount}
                </span><br/>
                    <span className="catalog items item text summary">
                  Стоимость: {summary} ₽
                </span><br/>
                </div>
            </Link>
            {!disableRemove ? <div className={"catalog buttons form"}>
                <button onClick={() => removeItem(batchId, callUpdate)}
                        className={"catalog buttons button remove type2 fa fa-trash-o"}/>
            </div>: ""}
        </div>
    </div>)
}

export function CartListItem({batchId, cardId, img, header, provider, price, summary, amount, callUpdate}) {
    return (<div className="catalog items item card noHover">
        <Link to={"item/" + cardId} id={cardId} style={{padding: '0px', display: "contents"}}>
            <img className="catalog items item img" src={img} alt={"Product main icon"}/>
        </Link>
        <div className={"catalog item card form"}>
            <Link to={"item/" + cardId} id={cardId} style={{padding: '0px', display: "contents"}}>
                <div className="catalog items item info">
                    <span className="catalog items item text main">{header}</span>
                    <div className="catalog items item text attributes">
                <span className="catalog items item text provider">
                    Изготовитель: {provider}
                </span><br/>
                        <span className="catalog items item text price">
                    Цена: {price} ₽
                </span><br/>
                        <span className="catalog items item text amount">
                    Количество: {amount}
                </span><br/>
                        <span className="catalog items item text summary">
                    Стоимость: {summary} ₽
                </span><br/>
                    </div>
                </div>
            </Link>
            {!disableRemove ? <div className={"catalog buttons form"}>
                <button onClick={() => removeItem(batchId, callUpdate)}
                        className={"catalog buttons button remove type2 fa fa-trash-o"}/>
            </div>: ""}
        </div>
    </div>)
}

async function removeItem(batchId, callUpdate) {
    await fetch(`/api/cart/removeBatch?batchId=${batchId}`, {
        method: "POST",
        headers: {accessToken: window.user.accessToken, username: window.user.username}
    }).then(callUpdate)
}