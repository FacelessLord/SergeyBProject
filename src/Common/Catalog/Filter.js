import React, {useEffect, useState} from "react";
import {Awaiter} from "../Awaiter";

export function Filter({value, setValue}) {
    return (<div className="catalog filter container">
        <FilterButton onClick={() => updateState({display: !value.display}, value, setValue)}/>
        <FilterSelector state={value} setState={setValue}/>
    </div>)
}

function updateState(changes, state, setState) {
    setState({...state, ...changes})
}

function FilterButton({onClick}) {
    return (<button className="catalog filter button" onClick={onClick}>Фильтры</button>)
}

function FilterSelector({state, setState}) {
    return (<div className={"catalog filter selector"} style={{display: state.display ? "flex" : "none"}}>
        <PriceLimits state={state} setState={setState}/>
        <Provider state={state} setState={setState}/>
    </div>)
}

function extractNumberString(value) {
    const str = value.replace(/^0+/g, '').replace(/[^\.0-9]/g, '');
    const parts = str.split('.');
    return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str;
}

function PriceLimits({state, setState}) {
    return (<div className={"catalog filter container selector"} id={"filter_price_container"}>
        <label className={"catalog filter selector price label"} htmlFor={"filter_price_container"}>Цена:</label>
        <div className={"catalog filter selector price form"}>От
            <input type={"text"} value={state.priceFrom} className={"catalog filter selector price value"}
                   onChange={e => updateState({
                       priceFrom: extractNumberString(e.target.value),
                       priceTo: Math.max(extractNumberString(e.target.value), state.priceTo)
                   }, state, setState)}/>
            ₽ - до<input type={"text"} value={state.priceTo} className={"catalog filter selector price value"}
                         onChange={e => updateState({
                             priceTo: extractNumberString(e.target.value),
                             priceFrom: Math.min(extractNumberString(e.target.value), state.priceFrom)
                         }, state, setState)}/>₽
        </div>
    </div>)
}

const catRE = /.*?category=(.*?)(&.*)?$/g;

function createProviderOptionsList(setState, state) {
    const category = catRE.exec(window.location);
    const category_param = category ? category[1] : '*';

    return fetch("/api/providers?category=" + category_param)
        .catch(r => "{ }")
        .then(t => t.json())
        .then(t => t.items)
        .catch(r => [])
        .then(l => l.map(o => (<div className={"catalog filter selector provider value"} key={o.id}>
            <input type="checkbox" name={o.id} onChange={e => addProvider(setState, state, o.id, e.target.checked)}/>{o.name}
        </div>)))
        .then(l => (
            <div className={"catalog filter selector provider form"}
                 onSelect={e => console.log("selected " + e.target.value)}>
                {l}
            </div>)
        )

}

function addProvider(setState, state, id, checked) {
    if (checked)
        state.providers.push(id);
    else
        state.providers.splice(state.providers.indexOf(id), 1);
    if (state.providers.length === 0)
        state.providers = [];
    updateState({providers: state.providers}, state, setState);
}

function Provider({state, setState}) {
    const [content, setContent] = useState("pending");
    return (<div className={"catalog filter container selector"} id={"filter_provider_container"}>
        <label className={"catalog filter selector provider label"}
               htmlFor={"filter_provider_container"}>Поставщики:</label>
        <Awaiter value={content} getter={() => createProviderOptionsList(setState, state)}
                 setValue={setContent}
                 err={<span className={"catalog filter selector provider selector"}>Не получилось загрузить список поставщиков</span>}/>
    </div>)
}
