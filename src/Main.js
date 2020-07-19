import {Route, Switch} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {CatalogPage} from "./pages/CatalogPage";
import React, {useState} from "react";
import {CartPage} from "./pages/CartPage";
import {loadUser, saveUser} from "./Common/IdProvider";
import {LoginPage} from "./pages/LoginPage";

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
    return (<Switch>
        <Route exact path="/catalog" component={() => CatalogPage({category, setCategory})}/>
        <Route path="/cart" component={() => CartPage({setCategory})}/>
        <Route path="/login" component={() => LoginPage({setCategory})}/>
        <Route path="/" component={() => MainPage({category, setCategory})}/>
    </Switch>)
}


export default Main;
