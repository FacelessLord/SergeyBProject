import React from "react";

export function ItemDescription({data}) {
    return <div className={"catalogBig items description"}>
        {data.description}
    </div>
}