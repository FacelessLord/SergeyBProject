import {Route, Switch} from "react-router-dom";
import {MainPage} from "./pages/MainPage/MainPage";
import {CatalogPage} from "./pages/CatalogPage/CatalogPage";
import React, {useState} from "react";
import {CartPage} from "./pages/CartPage/CartPage";
import {loadUser, saveUser} from "./Common/IdProvider";

function Main() {
    [window.user, window.setUser] = useState(loadUser());
    window.updateUser = changes => {
        window.setUser({...window.user, ...changes});
        window.user = {...window.user, ...changes};
        saveUser();
    };
    const [category, setCategory] = useState("");
    // useEffect(() => {
    //     const handle = setTimeout(checkAuth, 10000);
    //     return () => clearTimeout(handle);
    // });
    console.log(category);
    return (<Switch>
        <Route exact path="/catalog" component={() => CatalogPage({category, setCategory})}/>
        <Route path="/cart" component={CartPage}/>
        <Route path="/" component={() => MainPage({category, setCategory})}/>
    </Switch>)
}


export default Main;
