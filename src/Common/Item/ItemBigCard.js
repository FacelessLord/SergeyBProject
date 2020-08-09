import React, {useState} from "react";
import "../../styles/catalogBig.css"
import {Counter} from "../Counter";
import {Link} from "react-router-dom";


export function addItemToCart(data, count, setMessage) {
    return () => {
        fetch(`/api/cart/add?itemId=${data.id}&amount=${count}`, {
            method: "POST",
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
            .then(t => t.json())
            .then(j => {
                if (j.success) {
                    setMessage("Товар добавлен в корзину")
                } else
                    switch (j.reason) {
                        case "wrongAmount":
                            setMessage("Количество должно быть больше нуля");
                            break;
                        case "nouser":
                        case "not_authorized":
                            setMessage("Для заказа товаров необходимо выполнить вход");
                            break;
                        default:
                            break;
                    }
            })
    };
}

export function ItemImageShow({imgId, setImgId, data, imgList, edit}) { // todo remove images
    return (<div className={"catalogBig images"}>
        <button disabled={imgId <= 0} className={"catalogBig buttons button type3 left"}
                id={"img_left_button"}
                onClick={() => {
                    const newValue = imgId - 1;
                    if (newValue !== imgId) {
                        document.getElementById(`item_${imgId}`).classList.add("hidden")
                        document.getElementById(`item_${newValue}`).classList.remove("hidden")
                    }
                    setImgId(newValue)
                }}>{"<"}</button>
        <img className="catalogBig items item img" id={`item_${0}`}
             src={`/api/images/forItem?id=${data.id}&imgId=${0}`}
             alt={"Картинка товара"}/>
        {imgList}
        <button disabled={imgId >= data.img_count - 1}
                className={"catalogBig buttons button type3 right"}
                id={"img_right_button"} onClick={() => {
            const newValue = imgId + 1;
            if (newValue !== imgId) {
                document.getElementById(`item_${imgId}`).classList.add("hidden")
                document.getElementById(`item_${newValue}`).classList.remove("hidden")
            }
            setImgId(newValue)
        }}>{">"}</button>
    </div>);
}

function wrapData(data, imgId, setImgId, count, setCount, message, setMessage) {

    const imgList = []
    for (let i = 1; i < data.img_count; i++) {
        imgList.push(<img key={i} className="catalogBig items item img hidden"
                          src={`/api/images/forItem?id=${data.id}&imgId=${i}`}
                          alt={"Картинка товара"} id={`item_${i}`}/>)
    }


    return (<div className={"catalogBig items item card"}>
        <ItemImageShow imgId={imgId} setImgId={setImgId} data={data} imgList={imgList}/>
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
        <div className={"catalogBig buttons column"}>
            <div className={"catalogBig buttons container"}>
                {message ? <div className={"account message"} id={"account_message"}>{message}</div> : ""}
                <div className={"catalogBig cartButtons"}>
                    <Counter from={1} to={2000} value={count} setValue={setCount} className={"catalogBig"}/>
                    <div className={"catalogBig cartButtons green"}>
                        {window.user.permission > 0 ? <Link className={"catalogBig buttons button type0 edit"}
                                                            to={`/item/edit/${data.id}`}>Редактировать</Link> : ""}
                        <button className={"catalogBig buttons button type0 add"}
                                onClick={addItemToCart(data, count, setMessage)}>Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export function ItemBigCard({data}) {
    const [count, setCount] = useState(1)
    const [imgId, setImgId] = useState(0)
    const [message, setMessage] = useState("")
    if (data.success)
        return wrapData(data, imgId, setImgId, count, setCount, message, setMessage)
    return "Не удалось загрузить товар"
}