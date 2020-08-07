import React from "react";

export function ItemEditDescription({data, setData}) {
    return (<div style={{display: "flex", flexDirection: "column"}}>
        <label htmlFor={"description"}>Описание товара</label>
        <textarea className={"catalogBig items description"} id={"description"} value={data.description} onChange={e => setData({...data, description: e.target.value})}/>
    </div>)
}