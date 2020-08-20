import {useAwait} from "../Common/Awaiter";
import React, {useState} from "react";
import {confirmRegister} from "../Common/IdProvider";


export function ConfirmRegisterPage(props) {
    const username = props.match.params.username
    const token = props.match.params.token
    const [value, setValue] = useState({})
    const [message, setMessage] = useState("")
    useAwait(value, setValue, () => confirmRegister(username, token).then(v => v.json()).then(v => {
        if (v.success)
            setMessage("Ваша регистрация завершена, для входа воспользуйтесь панелью справа")
        else
            setMessage(v.reason)
        return v;
    }), v => !!v, "Не удалось завершить регистрацию")
    return (<div>
        {message ? <div className={"register message success"}>message</div> : ""}
    </div>)
}
