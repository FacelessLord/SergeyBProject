import {Header} from "../Common/Header/Header";
import React from "react";
import {Footer} from "../Common/Footer/Footer";
import {RegisterForm} from "../Common/RegisterForm";

export function RegisterPage({setCategory}) {
    return (
        <div id="page">
            <Header setCategory={setCategory}/>
            <div id="content_wrapper">
                <RegisterForm/>
            </div>
            <Footer/>
        </div>
    )
}
