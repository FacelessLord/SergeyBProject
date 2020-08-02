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

export function ItemCartCard({batchId, type, cardId, img, header, provider, price, summary, amount}) {
    switch (type) {
        case "list":
            return (<CartListItem batchId={batchId} cardId={cardId} header={header} img={img} amount={amount}
                                  price={price} provider={provider} summary={summary}/>)
        default:
            return (<CartPanelItem batchId={batchId} cardId={cardId} header={header} img={img} amount={amount}
                                   price={price} provider={provider} summary={summary}/>)
    }
}

export function CartPanelItem({batchId, cardId, img, header, provider, price, summary, amount}) {
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
                  Цена: {price}₽
                </span><br/>
                    <span className="catalog items item text amount">
                  Количество: {amount}
                </span><br/>
                    <span className="catalog items item text summary">
                  Стоимость: {summary}
                </span><br/>
                </div>
            </Link>
            <div className={"catalog buttons form"}>
                <button onClick={() => removeItem(batchId)}
                        className={"catalog buttons button remove type2 fa fa-trash-o"}/>
            </div>
        </div>
    </div>)
}

export function CartListItem({batchId, cardId, img, header, provider, price, summary, amount}) {
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
                    Цена: {price}₽
                </span><br/>
                        <span className="catalog items item text amount">
                    Количество: {amount}
                </span><br/>
                        <span className="catalog items item text summary">
                    Стоимость: {summary}
                </span><br/>
                    </div>
                </div>
            </Link>
            <div className={"catalog buttons form"}>
                <button onClick={() => removeItem(batchId)}
                        className={"catalog buttons button remove type2 fa fa-trash-o"}/>
            </div>
        </div>
    </div>)
}

async function removeItem(batchId) {
    await fetch(`/api/cart/removeBatch?username=${window.user.username}&accessToken=${window.user.accessToken}&batchId=${batchId}`, {
        method: "POST"
    })
}