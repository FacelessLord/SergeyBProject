import React, {useState} from "react";
import {AccountFinishEditButton} from "../Common/Account/EditAccountButton";
import {AccountEditForm} from "../Common/Account/AccountEditForm";

export function AccountEditPage() {
    const [userData, setUserData] = useState({email: "", name: ["", "", ""], created: "", lastUpdate: ""})
    const [message, setMessage] = useState("");
    return (<div id="content_wrapper">
        <h2>Личный кабинет</h2>
        <div className="main panel">
            <AccountEditForm userData={userData} setUserData={setUserData} message={message}/>
            <AccountFinishEditButton userData={userData} setMessage={setMessage}/>
        </div>
    </div>)
}