import {Category, NestedCategory} from "./Category";
import React, {useEffect, useState} from "react";

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


export function Categories({setCategory}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            const cats = await fetch("/api/categories")
                .catch(r => "{}")
                .then(t => t.json())
                .then(j => createList(j, setCategory))
                .catch(r => []);
            setCategories(cats)
        }

        if (categories.length === 0)
            getCategories()
    });

    return (<div className="categories" id="catalog_buttons">
        {categories}
    </div>);

}
