import React from "react";
import {Header} from "../../Common/Header/Header.js"
import {ResourceDescription} from "./ResourceDescription";
import {Catalog} from "../../Common/Catalog/Catalog";
import {Link} from "react-router-dom";
import {Footer} from "../../Common/Footer/Footer";
import {LoginForm} from "../../Common/LoginForm";


export function MainPage({category, setCategory}) {
    return (
        <div id="page">
            <Header category={category} setCategory={setCategory}/>
            <div id="content_wrapper">
                <LoginForm/>
                <div className="site main panel">
                    <ResourceDescription/>
                    <Catalog type={window.user.view} category={category}/>
                    <Link to={"/catalog"} className="catalog buttons button more">
                        Показать полностью
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


