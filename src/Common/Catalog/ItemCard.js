import React from "react";

export function ItemCard({cardId, img, header, provider, price, inStock}) {
    return (<a className="item card" href={"item?itemId=" + cardId} id={cardId}>
        <img className="item img" src={img}/>
        <span className="item text main">{header}</span>
        <div className="item text attributes">
            <span className="item text provider">
              Изготовитель: {provider}
            </span><br/>
            <span className="item text price">
              Цена: {price}
            </span><br/>
            <span className="item text stock">
              В наличии: {inStock}
            </span><br/>
        </div>
    </a>)
}

export function ItemCardList({cardId, img, header, provider, price, inStock}) {
    return (<a className="item card" href={"item?itemId=" + cardId} id={cardId}>
        <img className="item img" src={img} alt={"Product main icon"}/>
        <div className="item info">
            <span className="item text main">{header}</span>
            <div className="item text attributes">
              <span className="item text provider">
                Изготовитель: {provider}
              </span><br/>
                <span className="item text price">
                Цена: {price}
              </span><br/>
                <span className="item text stock">
                В наличии: {inStock}
              </span><br/>
            </div>
        </div>
    </a>)
}

export function ItemCartCard({cardId, img, header, price}) {
    return (<a className="item card" href={"item?itemId=" + cardId} id={cardId}>
        <img className="item img" src={img}/>
        <div className="item info">
            <span className="item text main">{header}</span>
            <div className="item text attributes cart">
                <span className="item text price cart">
                Цена: {price}
              </span>
            </div>
        </div>
    </a>)
}
