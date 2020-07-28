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

export function ItemCartCard({cardId, img, header, price}) {
    return (<Link className="catalog items item card" to={"item/" + cardId} id={cardId}>
        <img className="catalog items item img" src={img} alt={"Картинка товара"}/>
        <div className="catalog items item info">
            <span className="catalog items item text main">{header}</span>
            <div className="catalog items item text attributes cart">
                <span className="catalog items item text price cart">
                Цена: {price}
              </span>
            </div>
        </div>
    </Link>)
}
