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
              Цена: {price}
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
                Цена: {price}
              </span><br/>
                <span className="catalog items item text stock">
                В наличии: {inStock}
              </span><br/>
            </div>
        </div>
    </Link>)
}

export function ItemCartCard({type, cardId, img, header, provider, price, summary, amount}) {
    switch (type) {
        case "list":
            return (<CartListItem cardId={cardId} header={header} img={img} amount={amount}
                                  price={price} provider={provider} summary={summary}/>)
        default:
            return (<CartPanelItem cardId={cardId} header={header} img={img} amount={amount}
                                   price={price} provider={provider} summary={summary}/>)
    }
}

export function CartPanelItem({cardId, img, header, provider, price, summary, amount}) {
    return (<Link className="catalog items item card" to={"item/" + cardId} id={cardId}>
        <img className="catalog items item img" src={img} alt={"Картинка товара"}/>
        <span className="catalog items item text main">{header}</span>
        <div className="catalog items item text attributes">
            <span className="catalog items item text provider">
              Изготовитель: {provider}
            </span><br/>
            <span className="catalog items item text price">
              Цена: {price}
            </span><br/>
            <span className="catalog items item text amount">
              Количество: {amount}
            </span><br/>
            <span className="catalog items item text summary">
              Стоимость: {summary}
            </span><br/>
        </div>
    </Link>)
}

export function CartListItem({cardId, img, header, provider, price, summary, amount}) {
    return (<Link className="catalog items item card" to={"item/" + cardId} id={cardId}>
        <img className="catalog items item img" src={img} alt={"Product main icon"}/>
        <div className="catalog items item info">
            <span className="catalog items item text main">{header}</span>
            <div className="catalog items item text attributes">
                <span className="catalog items item text provider">
                    Изготовитель: {provider}
                </span><br/>
                <span className="catalog items item text price">
                    Цена: {price}
                </span><br/>
                <span className="catalog items item text amount">
                    Количество: {amount}
                </span><br/>
                <span className="catalog items item text summary">
                    Стоимость: {summary}
                </span><br/>
            </div>
        </div>
    </Link>)
}
