import React, {useState} from "react";
import '../styles/login_styles.css'
import {loginUser} from "./IdProvider"

async function performLogin(setMessage) {
    const username = document.getElementById("login_username").value;
    const password = document.getElementById("login_password").value;
    await loginUser(username, password).then(t => {
        if (t.accessToken === "") {
            setMessage(t.message);
        } else
            setMessage("");
        if (t.accessToken !== "") {
            window.updateUser({username: username, accessToken: t.accessToken, permission: t.permission, loggedIn: t.accessToken !== ""});
            document.location = "/";
        }
    })
}

function formKeyPressed(t) {
    if (t.key === "Enter")
        document.getElementById("submit_login").click()
}

export function LoginForm() {
    const [message, setMessage] = useState("");
    if (window.user.loggedIn)
        return (<div className={"login message success"}>Вы уже выполнили вход</div>);
    const l = [];
    if (message) l.push(<div key={0} className={"login message err"}>{message}</div>);

    l.push(<div key={1} className="login form" id={"login_form"} onKeyPress={formKeyPressed}>
        <div className={"login block"}>
            <label htmlFor={"login_username"}>Логин</label>
            <input id={"login_username"} type={"login"}/>
        </div>
        <div className={"login block"}>
            <label htmlFor={"login_password"}>Пароль</label>
            <input id={"login_password"} type={"password"}/>
        </div>
        <input type={"submit"} id={"submit_login"} className={"login buttons button submit"}
               onClick={() => performLogin(setMessage)} value={"Войти"}/>
    </div>);

    return l;

}
