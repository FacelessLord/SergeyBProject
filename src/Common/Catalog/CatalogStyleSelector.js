import React, {useState} from "react";
import {getUser, setUserView} from "../IdProvider";

export function CatalogStyleSelector({value, valueSetter: setValue}) {
    return (<div className="catalog items selector form">
        <StyleOption value={value} onClick={() => {
            setValue("panels");
            setUserView("panels");
        }} option="panels"/>
        <StyleOption value={value} onClick={() => {
            setValue("list");
            setUserView("list");
        }} option="list"/>
    </div>)
}

function StyleOption({value, option, onClick}) {
    const design = getOptionDesign(option);
    const active = value === option ? "active" : "inactive";
    return (<button className={"catalog items selector option " + option + " container " + active} id={"style_" + option}
                    onClick={onClick}>{design}</button>)
}

function getOptionDesign(option) {
    switch (option) {
        case "panels":
            return ([<div key={0} className={"catalog items selector option panels element"}/>,
                <div key={1} className={"catalog items selector option panels element"}/>,
                <div key={2} className={"catalog items selector option panels element"}/>,
                <div key={3} className={"catalog items selector option panels element"}/>]);
        case "list":
            return ([<div key={0} className={"catalog items selector option list element1"}/>,
                <div key={1} className={"catalog items selector option list element2"}/>,
                <div key={2} className={"catalog items selector option list element1"}/>,
                <div key={3} className={"catalog items selector option list element2"}/>,
                <div key={4} className={"catalog items selector option list element1"}/>,
                <div key={5} className={"catalog items selector option list element2"}/>,])
    }
}
