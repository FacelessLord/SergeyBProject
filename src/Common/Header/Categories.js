import {Category, NestedCategory} from "./Category";
import React, {useEffect, useState} from "react";
import {useAwaitWrap} from "../Awaiter";

function createList(json, setCategory) {
    const l = [];
    for (let value of json.items) {
        if (value.nested) {
            l.push(<NestedCategory key={value.id} categoryId={value.id} categoryName={value.name}
                                   subcategories={value.subcategories} setCategory={setCategory}/>)
        } else {
            l.push(<Category key={value.id} categoryId={value.id} categoryName={value.name} setCategory={setCategory}/>)
        }
    }
    return l
}

// categories json structure:
// {
//   nested: false,
//   id:"id",
//   name: "name"
// }
// {
//   nested: true,
//   id: "id",
//   name:"name",
//   subcategories: [{nested:false,id:id,name:name,...}]
// }

async function getCategories() {
    return await fetch("/api/categories")
        .catch(r => "{}")
        .then(t => t.json())
}

export function Categories({setCategory, categoryMonitor}) {
    const [categories, setCategories] = useState([0]);

    useEffect(() => {
        setCategories([0])
    }, [categoryMonitor])

    return (<div className="categories" id="catalog_buttons">
        {useAwaitWrap(categories, setCategories, getCategories, c => c[0] === 0, () => createList(categories, setCategory), [], [categories])}
    </div>);

}
