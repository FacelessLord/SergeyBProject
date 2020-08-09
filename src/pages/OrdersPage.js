import React from "react";
import {CatalogOrders} from "../Common/Catalog/CatalogOrders";

export function OrdersPage() {
    return (
        <div id="content_wrapper">
            <div className="site main panel part">
                <h1>Ваши заказы</h1>
                <CatalogOrders/>
            </div>
        </div>
    )
}
