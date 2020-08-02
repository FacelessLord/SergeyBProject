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
    // useEffect(() => {
    //     const handle = setTimeout(checkAuth, 10000);
    //     return () => clearTimeout(handle);
    // });
    return (<div id="page">
        <Header category={category} setCategory={setCategory}/>
        <Switch>
            <Route exact path="/catalog" component={() => CatalogPage({category})}/>
            <Route path="/cart" component={CartPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register/success" component={RegisterSuccessPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/account/edit" component={AccountEditPage}/>
            <Route path="/account" component={AccountPage}/>
            <Route path="/image" component={LoadImagePage}/>
            <Route path="/item/:itemId" component={ItemPage}/>
            <Route path="/" component={() => MainPage({category})}/>
        </Switch>
        <Footer/>
    </div>)
}


export default Main;
