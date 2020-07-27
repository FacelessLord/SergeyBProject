import React, {useEffect, useState} from "react";
import {Awaiter} from "../Awaiter";
import "../../styles/catalogBig.css"

async function getItemData(item) {
    return fetch(`/api/item/data?itemId=${item}`).then(t => t.json())
        .then(async t => {
            t.provider = (await fetch(`/api/providerName?providerId=${t.provider_id}`).then(t => t.json())).name;
            return t
        })
}

function wrapData(data, imgId, setImgId) {
    const imgList = []
    for (let i = 1; i < data.img_count; i++) {
        imgList.push(<img key={i} className="catalogBig items item img hidden"
                          src={`/api/images/forItem?id=${data.id}&imgId=${i}`}
                          alt={"Картинка товара"} id={`item_${i}`}/>)
    }


    return (<div className={"catalogBig items item card"}>
        <div className={"catalogBig images"}>
            <button disabled={imgId === 0} className={"catalogBig fa fa-angle-left"} id={"img_left_button"}
                    onClick={() => {
                        const newValue = Math.max(0, imgId - 1);
                        if (newValue !== imgId) {
                            document.getElementById(`item_${imgId}`).classList.add("hidden")
                            document.getElementById(`item_${newValue}`).classList.remove("hidden")
                        }
                        setImgId(newValue)
                    }}/>
            <img className="catalogBig items item img" id={`item_${0}`}
                 src={`/api/images/forItem?id=${data.id}&imgId=${0}`}
                 alt={"Картинка товара"}/>
            {imgList}
            <button disabled={imgId === data.img_count - 1} className={"catalogBig fa fa-angle-right"}
                    id={"img_right_button"} onClick={() => {
                const newValue = Math.min(data.img_count - 1, imgId + 1);
                if (newValue !== imgId) {
                    document.getElementById(`item_${imgId}`).classList.add("hidden")
                    document.getElementById(`item_${newValue}`).classList.remove("hidden")
                }
                setImgId(newValue)
            }}/>
        </div>
        <div className="catalogBig items item text attributes">
            <span className="catalogBig items item text provider">
              Изготовитель: {data.provider}
            </span><br/>
            <span className="catalogBig items item text price">
              Цена: {data.price ? (data.price + " ₽") : ""}
            </span><br/>
            <span className="catalogBig items item text stock">
              В наличии: {data.in_stock ? "Да" : "Нет"}
            </span><br/>
        </div>
        <div className={"catalogBig buttons container"}>
            <button className={"catalogBig buttons button add"}>Добавить в корзину</button>
        </div>
    </div>)
}

export function ItemBigCard({data}) {
    const [imgId, setImgId] = useState(0)
    if (data.success)
        return wrapData(data, imgId, setImgId)
    return "Не удалось загрузить товар"
}