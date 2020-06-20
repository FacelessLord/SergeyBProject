import React, {useState} from "react";
import {getUser, setUserView} from "../IdProvider";

export function CatalogStyleSelector({value, valueSetter: setValue}) {
    return (<span className="catalog selector">
        <StyleOption value={value} onClick={() => {
            setValue("panels");
            setUserView("panels");
        }} option="panels"/>
        <StyleOption value={value} onClick={() => {
            setValue("list");
            setUserView("list");
        }} option="list"/>
    </span>)
}

function StyleOption({value, option, onClick}) {
    const design = getOptionDesign(option);
    const active = value === option ? "active" : "inactive";
    return (<button className={"catalog selector option " + option + " " + active} id={"style_" + option}
                    onClick={onClick}>{design}</button>)
}

function getOptionDesign(option) {
    switch (option) {
        case "panels":
            return ([<div key={0} className={"catalog selector option panels sub"}/>,
                <div key={1} className={"catalog selector option panels sub"}/>,
                <div key={2} className={"catalog selector option panels sub"}/>,
                <div key={3} className={"catalog selector option panels sub"}/>]);
        case "list":
            return ([<div key={0} className={"catalog selector option list sub1"}/>,
                <div key={1} className={"catalog selector option list sub2"}/>,
                <div key={2} className={"catalog selector option list sub1"}/>,
                <div key={3} className={"catalog selector option list sub2"}/>,
                <div key={4} className={"catalog selector option list sub1"}/>,
                <div key={5} className={"catalog selector option list sub2"}/>,])
    }
}
