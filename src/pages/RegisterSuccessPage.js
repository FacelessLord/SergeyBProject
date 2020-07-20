import {Header} from "../Common/Header/Header";
import React from "react";
import {Footer} from "../Common/Footer/Footer";

export function RegisterSuccessPage({setCategory}) {
    return (
        <div id="page">
            <Header setCategory={setCategory}/>
            <div id="content_wrapper">
                Для завершения регистрации проверьте вашу почту.
            </div>
            <Footer/>
        </div>
    )
}
