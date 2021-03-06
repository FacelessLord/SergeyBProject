import React from "react";
import {AccountForm} from "../Common/Account/AccountForm";
import {EditAccountButton} from "../Common/Account/EditAccountButton";

export function AccountPage() {
    return (<div id="content_wrapper">
        <h2>Личный кабинет</h2>
        <div className="main panel">
            <AccountForm/>
            <EditAccountButton/>
        </div>
    </div>)
}