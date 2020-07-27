import {Awaiter} from "../Awaiter";
import React, {useState} from "react";

async function getItemDescription(item) {
    return fetch(`/api/item/description?itemId=${item}`).then(t => t.json()).then(t => {
        if(t.success)
            return t.description
        else
            throw new Error()
    })
}

export function ItemDescription({item}) {
    const [description, setDescription] = useState("pending")
    return <div className={"catalogBig items description"}>
        <Awaiter getter={() => getItemDescription(item)} value={description} setValue={setDescription}
                 err={"Не удалось загрузить описание товара"}/>
    </div>
}