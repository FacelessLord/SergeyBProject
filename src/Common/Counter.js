import React from "react";

export function Counter({from, to, value, setValue, className}) {
    return (<div className={className + " counter container"}>
        <button className={className + " counter buttonLess"} disabled={value <= from} onClick={() => {
            if (value > from) {
                setValue(value - 1)
            }
        }}>{"<"}</button>
        <span className={className + " counter valueField"}>{value}</span>
        <button className={className + " counter buttonMore"} disabled={value >= to} onClick={() => {
            if (value < to) {
                setValue(value + 1)
            }
        }}>{">"}</button>
    </div>)
}