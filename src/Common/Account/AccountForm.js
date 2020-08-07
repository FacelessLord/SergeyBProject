import React, {useState} from "react";
import "../../styles/account_styles.css"
import {Awaiter} from "../Awaiter";

async function getUserData() {
    return await fetch(`/api/user/data`,
        {
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .then(t => t.json())
        .catch(_ => {
        })
}

function characteristicField(field, id, text) {
    return [<label key={0} htmlFor={"account_" + id}>{text}</label>,
        <span key={1} className={"account field " + id} id={"account_" + id}>{field}</span>]
}

function wrapData(data) {
    const list = []
    list.push(
        <div key={0} className={"account block email"}>
            {characteristicField(data.email, "email", "EMail")}
        </div>)
    list.push(
        <div key={1} className={"account block name"}>
            {characteristicField(data.name[0], "name", "Имя")}
            {characteristicField(data.name[1], "surname", "Фамилия")}
            {characteristicField(data.name[2], "last_name", "Отчество")}
        </div>)
    list.push(
        <div key={2} className={"account block dates"}>
            {characteristicField(data.created, "created", "Зарегистрирован")}
            {characteristicField(data.lastUpdate, "lastUpdate", "Последнее обновление")}
        </div>)

    return list
}

export function AccountForm() {
    const [message] = useState("");
    const [userData, setUserData] = useState("")
    return (<div className={"account form"}>
        {message ? <div className={"account message"} id={"account_message"}>{message}</div> : ""}
        <div className={"account block"}>
            <label htmlFor={"account_username"}>Логин</label>
            <span className={"account field login"} id={"account_username"}>{window.user.username}</span>
        </div>
        <Awaiter base={""} err={""} value={userData} setValue={setUserData}
                 getter={() => getUserData().then(wrapData)}/>
    </div>)
}