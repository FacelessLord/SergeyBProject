import React from "react";
import {CatalogStyleSelector} from "../Common/Catalog/CatalogStyleSelector";
import {CatalogCart} from "../Common/Catalog/CatalogCart";

export function CartPage() {
    const setView = v => {
        window.updateUser({view: v});
    };
    return (
        <div id="content_wrapper">
            <div className="main panel">
                <div className="catalog header" style={{marginLeft: "0px"}}>
                    <h1 style={{marginTop: "12px"}}>Ваши товары:</h1>
                    <CatalogStyleSelector type={"cart"} value={window.user.view} valueSetter={setView}/>
                </div>
                <CatalogCart type={window.user.view}/>
            </div>
        </div>)
}
