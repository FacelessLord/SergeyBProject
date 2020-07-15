import React from "react";
import '../styles/login_styles.css'
import {loginUser} from "./IdProvider"

async function performLogin() {
    const username = document.getElementById("login_username").value;
    const password = document.getElementById("login_password").value;
    await loginUser(username, password).then(t => {
        window.updateUser({username: username, access_token: t.access_token, loggedIn: t.access_token !== ""});
    })
}

function formKeyPressed(t) {
    if (t.key === "Enter")
        document.getElementById("submit_login").click()
}

export function LoginForm() {
    if (window.user.loggedIn)
        return (<span/>);
    return (<div className="login form" id={"login_form"} onKeyPress={formKeyPressed}>
        <div className={"login block"}>
            <label htmlFor={"login_username"}>Логин</label>
            <input id={"login_username"} type={"login"}/>
        </div>
        <div className={"login block"}>
            <label htmlFor={"login_password"}>Пароль</label>
            <input id={"login_password"} type={"password"}/>
        </div>
        <input type={"submit"} id={"submit_login"} className={"login buttons button submit"} onClick={performLogin} value={"Войти"}/>
    </div>)

}
