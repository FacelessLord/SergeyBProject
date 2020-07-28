import React, {useState} from "react";
import {useAwaitWrap} from "../Awaiter";

export function Filter({value, setValue, category}) {
    return (<div className="catalog filter container">
        <FilterButton onClick={() => updateState({display: !value.display}, value, setValue)}/>
        <FilterSelector state={value} setState={setValue} category={category}/>
    </div>)
}

function updateState(changes, state, setState) {
    setState({...state, ...changes})
}

function FilterButton({onClick}) {
    return (<button className="catalog filter button" onClick={onClick}>Фильтры</button>)
}

function FilterSelector({state, setState, category}) {
    return (<div className={"catalog filter selector"} style={{display: state.display ? "flex" : "none"}}>
        <PriceLimits state={state} setState={setState}/>
        <Provider state={state} setState={setState} category={category}/>
    </div>)
}

function extractNumberString(value) {
    const str = value.replace(/^0+(?=[0-9])/g, '').replace(/[^.0-9]/g, '');
    const parts = str.split('.');
    return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str;
}

function PriceLimits({state, setState}) {
    return (<div className={"catalog filter container selector"} id={"filter_price_container"}>
        <label className={"catalog filter selector price label"} htmlFor={"filter_price_container"}>Цена:</label>
        <div className={"catalog filter selector price form"}>От
            <input type={"text"} value={state.priceFrom} className={"catalog filter selector price value"}
                   onChange={e => setState({
                       ...state,
                       priceFrom: extractNumberString(e.target.value),
                       priceTo: (state.priceTo === 0 || state.priceTo === "") ? state.priceTo : Math.max(extractNumberString(e.target.value), state.priceTo)
                   })}/>
            ₽ - до<input type={"text"} value={state.priceTo} className={"catalog filter selector price value"}
                         onChange={e => setState({
                             ...state,
                             priceTo: extractNumberString(e.target.value),
                             priceFrom: (e.target.value === "0" || e.target.value === "") ? state.priceFrom : Math.min(extractNumberString(e.target.value), state.priceFrom)
                         })}/>₽
        </div>
    </div>)
}

async function createProviderOptionsList(category) {
    return await fetch("/api/providers?category=" + category)
        .catch(r => "{ }")
        .then(t => t.json())
        .then(t => t.items)
        .catch(r => [])
}

function addProvider(setState, state, id, checked) {
    let providers = [...state.providers];
    if (checked)
        providers.push(id);
    else
        providers.splice(providers.indexOf(id), 1);
    if (providers.length === 0)
        providers = [];
    setState({...state, providers: providers, display: state.display});//!state.display - workaround
}

function wrapData(data, state, setState) {
    return (<div className={"catalog filter selector provider form"}
                 onSelect={e => console.log("selected " + e.target.value)}>
        {data.map(o => (<div className={"catalog filter selector provider value"} key={o.id}>
            <input type="checkbox" name={o.id}
                   onChange={e => addProvider(setState, state, o.id, e.target.checked)}/>{o.name}
        </div>))}
    </div>)

}

function Provider({state, setState, category}) {
    const [providers, setProviders] = useState([undefined])
    const data = useAwaitWrap(providers, setProviders,
        () => createProviderOptionsList(category),
        l => l.length === 1 && l[0] === undefined,
        data => wrapData(data, state, setState),
        "Не получилось загрузить список поставщиков")

    return (<div className={"catalog filter container selector"} id={"filter_provider_container"}>
        <label className={"catalog filter selector provider label"}
               htmlFor={"filter_provider_container"}>Поставщики:</label>
        {data}
    </div>)
}
