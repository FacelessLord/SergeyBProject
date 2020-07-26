import {Header} from "../Common/Header/Header";
import React from "react";
import {AccountForm} from "../Common/AccountForm";

export function AccountPage({setCategory}) {
    return (<div id="page">
        <Header setCategory={setCategory}/>
        <div id="content_wrapper">
            <div className="main panel">
                <AccountForm/>
            </div>
        </div>
    </div>)
}