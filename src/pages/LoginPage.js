import {Header} from "../Common/Header/Header";
import {LoginForm} from "../Common/LoginForm";
import React from "react";
import {Footer} from "../Common/Footer/Footer";

export function LoginPage({setCategory}) {
    return (
        <div id="page">
            <Header setCategory={setCategory}/>
            <div id="content_wrapper">
                <LoginForm/>
            </div>
            <Footer/>
        </div>
    )
}
