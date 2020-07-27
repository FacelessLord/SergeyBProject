import React, {useState} from "react";

export function ItemDescription({data}) {
    const [description, setDescription] = useState("pending")
    return <div className={"catalogBig items description"}>
        {data.description}
    </div>
}