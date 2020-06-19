import App from "./App";
import {Route, Switch} from "react-router-dom";
import {MainPage} from "./MainPage/MainPage";
import {CatalogPage} from "./CatalogPage/CatalogPage";
import React from "react";
import {CartPage} from "./CartPage/CartPage";

function Main() {
    return (<Switch>
        <Route exact path="/catalog" component={CatalogPage}/>
        <Route path="/cart" component={CartPage}/>
        <Route path="/" component={MainPage}/>
    </Switch>)
}

export default Main;
