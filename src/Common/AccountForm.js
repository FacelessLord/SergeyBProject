import React, {useState} from "react";
import "../styles/account_styles.css"
import {Awaiter} from "./Awaiter";

async function getUserData() {
    return fetch(`/api/userData?username=${window.user.username}&accessToken=${window.user.access_token}`).catch(_ => {})
}

function wrapData(data) {
    const list = []
    list.push(
        <div key={0} className={"account block email"}>
            <label htmlFor={"account_email"}>EMail</label>
            <span className={"account field email"} id={"account_email"}>{data.email}</span>
        </div>)
    list.push(
        <div key={1} className={"account block name"}>
            <label htmlFor={"account_name"}>Имя</label>
            <span className={"account field name"} id={"account_name"}>{data.name[0]}</span>
            <label htmlFor={"account_name"}>Фамилия</label>
            <span className={"account field surname"} id={"account_surname"}>{data.name[1]}</span>
            <label htmlFor={"account_name"}>Отчество</label>
            <span className={"account field last_name"} id={"account_last_name"}>{data.name[2]}</span>
        </div>)
    list.push(
        <div key={2} className={"account block dates"}>
            <label htmlFor={"account_created_date"}>Зарегистрирован</label>
            <span className={"account field created"} id={"account_created_date"}>{data.created}</span>
            <label htmlFor={"account_last_login_date"}>Последнее обновление</label>
            <span className={"account field lastLogin"} id={"account_last_login_date"}>{data.lastLogin}</span>
        </div>)

    return list
}

export function AccountForm(){
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState("")
    return (<div className={"account form"}>
        <div className={"account message"} id={"account_message"}>{message}</div>
        <div className={"account block"}>
            <label htmlFor={"account_username"}>Логин</label>
            <span className={"account field login"} id={"account_username"}>{window.user.username}</span>
        </div>
        <Awaiter base={""} err={""} value={userData} setValue={setUserData} getter={() => getUserData().then(wrapData)}/>
    </div>)
}