import React, {useState} from "react";
import "../../styles/catalogBig.css"
import {ItemImageShow} from "./ItemBigCard";

function wrapData(data, imgId, setImgId, setData, noimage) {

    const imgList = []
    for (let i = 1; i < data.img_count; i++) {
        imgList.push(<img key={i} className="catalogBig items item img hidden"
                          src={`/api/images/forItem?id=${data.id}&imgId=${i}`}
                          alt={"Картинка товара"} id={`item_${i}`}/>)
    }


    return (<div className={"catalogBig items item card"}>
        {!noimage ? <ItemImageShow imgId={imgId} setImgId={setImgId} data={data} imgList={imgList}/> : ""}
        <div className="catalogBig items item text attributes">
            <span className="catalogBig items item text provider">
              Изготовитель: <input type={"name"} value={data.provider}
                                   onChange={e => setData({...data, provider: e.target.value})}/>
            </span><br/>
            <span className="catalogBig items item text price">
              Цена: <input type={"number"} value={data.price} step={0.01}
                           onChange={e => setData({...data, price: e.target.value})}/>
            </span><br/>
            <span className="catalogBig items item text stock">
              В наличии: <input type={"checkbox"} checked={data.in_stock}
                                onChange={e => setData({...data, in_stock: e.target.checked})}/>
            </span><br/>
        </div>
    </div>)
}

export function ItemEditBigCard({data, setData, noimage}) {
    const [imgId, setImgId] = useState(0)
    if (data.success)
        return wrapData(data, imgId, setImgId, setData, noimage)
    return "Не удалось загрузить товар"
}