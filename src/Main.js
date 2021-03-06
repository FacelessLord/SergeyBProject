import {Route, Switch} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {CatalogPage} from "./pages/CatalogPage";
import React, {useState} from "react";
import {CartPage} from "./pages/CartPage";
import {loadUser, saveUser} from "./Common/IdProvider";
import {LoginPage} from "./pages/LoginPage";
import {RegisterSuccessPage} from "./pages/RegisterSuccessPage";
import {RegisterPage} from "./pages/RegisterPage";
import {AccountPage} from "./pages/AccountPage";
import {AccountEditPage} from "./pages/AccountEditPage";
import {ItemPage} from "./pages/ItemPage";
import {Header} from "./Common/Header/Header";
import {Footer} from "./Common/Footer/Footer";

import "./styles/button_styles.css"
import {LoadImagePage} from "./pages/LoadImagePage";
import {ItemEditPage} from "./pages/ItemEditPage";
import {ItemCreatePage} from "./pages/ItemCreatePage";
import {OrdersPage} from "./pages/OrdersPage";
import {OrderPage} from "./pages/OrderPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {AboutPage} from "./pages/AboutPage";
import {ConfirmRegisterPage} from "./pages/ConfirmRegisterPage";

let _user = null;

function Main() {
    window.user = loadUser();

    [_user, window.setUser] = useState(0); //workaround to call page update on userChange
    window.updateUser = changes => {
        window.user = {...window.user, ...changes};
        saveUser();
        window.setUser(_user + 1);
    };
    const [category, setCategory] = useState("");
    const [categoryMonitor, setCategotyMonitor] = useState(false);
    window.updateCategories = () => setCategotyMonitor(!categoryMonitor)
    return (<div id="page">
        <Header category={category} setCategory={setCategory} categoryMonitor={categoryMonitor}/>
        <Switch>
            <Route exact path="/catalog" component={() => CatalogPage({category})}/>
            <Route path="/cart" component={CartPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register/success" component={RegisterSuccessPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/account/edit" component={AccountEditPage}/>
            <Route path="/account" component={AccountPage}/>
            <Route path="/image" component={LoadImagePage}/>
            <Route path="/item/edit/:itemId" component={ItemEditPage}/>
            <Route path="/item/create" component={ItemCreatePage}/>
            <Route path="/item/:itemId" component={ItemPage}/>
            <Route path="/orders" component={OrdersPage}/>
            <Route path="/order/:orderId" component={OrderPage}/>
            <Route path="/confirmRegister/:username/:token" component={ConfirmRegisterPage}/>
            <Route path="/" component={AboutPage}/>
            <Route exact path="/" component={() => MainPage({category})}/>
            <Route path="/" component={NotFoundPage}/>
        </Switch>
        <Footer/>
    </div>)
}


export default Main;
