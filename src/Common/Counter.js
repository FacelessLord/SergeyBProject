import React from "react";

export function Counter({from, to, value, setValue, className}) {
    return (<div className={className + " counter container"}>
        <button className={className + " buttons button type3 counter buttonLess"} disabled={value <= from}
                onClick={() => setValue(value - 1)}>{"<"}</button>
        <span className={className + " counter valueField"}>{value}</span>
        <button className={className + " buttons button type3 counter buttonMore"} disabled={value >= to}
                onClick={() => setValue(value + 1)}>{">"}</button>
    </div>)
}