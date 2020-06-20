import {Category, NestedCategory} from "./Category";
import React, {useEffect, useState} from "react";

function createList(json) {
    const l = [];
    for (let value of json.categories) {
        if (value.nested) {
            l.push(<NestedCategory key={value.id} categoryId={value.id} categoryName={value.name}
                                   subcategories={value.subcategories}/>)
        } else {
            l.push(<Category key={value.id} categoryId={value.id} categoryName={value.name}/>)
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


export function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            const cats = await fetch("/api/categories")
                .catch(r => "{}")
                .then(t => t.json())
                .then(j => createList(j))
                .catch(r => []);
            setCategories(cats)
        }

        if (categories.length === 0)
            getCategories()
    });

    return (<div className="catalogs" id="catalog_buttons">
        {categories}
    </div>);

}
