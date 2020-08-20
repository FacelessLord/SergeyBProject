import React, {useState} from "react";
import {AccountFinishEditButton} from "../Common/Account/EditAccountButton";
import {AccountEditForm} from "../Common/Account/AccountEditForm";
import {useAwait} from "../Common/Awaiter";
import {fetchWithAuth} from "../Common/Utils";


async function getUserData() {
    return fetchWithAuth(`/api/user/data`,
        {
            headers: {username: window.user.username, accessToken: window.user.accessToken}
        })
        .catch(_ => {
        })
}

async function loadUserData() {
    const data = await getUserData()
    for (let i = 0; i < 3; i++) {
        if (data.name[i] == null)
            data.name[i] = ""
    }
    return data
}

export function AccountEditPage() {
    const [userData, setUserData] = useState({email: "", name: ["", "", ""], created: "", lastUpdate: ""})
    useAwait(userData, setUserData,
        loadUserData, data => data.email === "",
        {email: "", name: ["", "", ""], created: "", lastUpdate: ""})
    const [message, setMessage] = useState("");
    return (<div id="content_wrapper">
        <h2>Личный кабинет</h2>
        <div className="main panel">
            <AccountEditForm userData={userData} setUserData={setUserData} message={message}/>
            <AccountFinishEditButton userData={userData} setMessage={setMessage}/>
        </div>
    </div>)
}