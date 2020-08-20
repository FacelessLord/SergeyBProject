import {useAwait} from "../Common/Awaiter";
import React, {useState} from "react";
import {confirmRegister} from "../Common/IdProvider";


export function ConfirmRegisterPage(props) {
    const username = props.match.params.username
    const token = props.match.params.token
    const [message, setMessage] = useState("")
    useAwait(message, setMessage, () => confirmRegister(username, token).then(v => {
        console.log(v)
        if (v.success)
            return "Ваша регистрация завершена, для входа воспользуйтесь панелью справа"

        if (v.reason === "already")
            return "Данный аккаунт уже подтверждён"

        return v.reason;
    }).catch(console.log), v => !v, "Не удалось завершить регистрацию")
    console.log(message)
    return (<div id="content_wrapper">
        <div className="site main panel part">
            {message ? <div className={"register message success"}>{message}</div> : "Загрузка..."}
        </div>
    </div>)
}
