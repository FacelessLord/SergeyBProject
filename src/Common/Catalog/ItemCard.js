import React from "react";

export function ItemCard({cardId, img, header, provider, price, inStock}) {
    return (<a className="catalog items item card" href={"item/" + cardId} id={cardId}>
        <img className="catalog items item img" src={img}/>
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
    </a>)
}

export function ItemCardList({cardId, img, header, provider, price, inStock}) {
    return (<a className="catalog items item card" href={"item/" + cardId} id={cardId}>
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
    </a>)
}

export function ItemCartCard({cardId, img, header, price}) {
    return (<a className="catalog items item card" href={"item/" + cardId} id={cardId}>
        <img className="catalog items item img" src={img}/>
        <div className="catalog items item info">
            <span className="catalog items item text main">{header}</span>
            <div className="catalog items item text attributes cart">
                <span className="catalog items item text price cart">
                Цена: {price}
              </span>
            </div>
        </div>
    </a>)
}
