import React, {useState} from "react";
import '../styles/login_styles.css'
import '../styles/register_styles.css'
import {registerUser} from "./IdProvider"

async function performRegister(setMessage) {
    const username = document.getElementById("register_username").value;
    const email = document.getElementById("register_email").value;
    const name = document.getElementById("register_name").value;
    const surname = document.getElementById("register_surname").value;
    const last_name = document.getElementById("register_last_name").value;
    const password = document.getElementById("register_password").value;
    await registerUser(username, [name, surname, last_name], email, password).then(t => {
        if (t.success) {
            document.location = "/register/success";
        } else {
            switch (t.reason) {
                case "noemail":
                    setMessage("Введите почтовый адрес");
                    break;
                case "email":
                    setMessage("Данный почтовый адрес уже занят");
                    break;
                case "username":
                    setMessage("Данный логин уже занят");
                    break;
                case "nousername":
                    setMessage("Введите непустой логин");
                    break;
                case "shortpassword":
                    setMessage("Минимальная длина пароля - 6 символов");
                    break;

            }
        }
    })
}

function formKeyPressed(t) {
    if (t.key === "Enter")
        document.getElementById("submit_login").click()
}

export function RegisterForm() {
    const [message, setMessage] = useState("");
    console.log(message);
    if (window.user.loggedIn)
        return (<div className={"register message success"}>Вы уже выполнили вход</div>);
    const l = [];
    if (message) l.push(<div key={0} className={"register message err"}>{message}</div>);

    l.push(<div key={1} className="register form" id={"register_form"} onKeyPress={formKeyPressed}>
        <div className={"register form block"}>
            <div className={"register block"}>
                <label htmlFor={"register_email"}>Email</label>
                <input id={"register_email"} type={"email"}/>
            </div>
        </div>
        <div className={"register form block"}>
            <div className={"register block"}>
                <label htmlFor={"register_username"}>Логин</label>
                <input id={"register_username"} type={"username"}/>
            </div>
            <div className={"register block"}>
                <label htmlFor={"register_password"}>Пароль</label>
                <input id={"register_password"} type={"password"}/>
            </div>
        </div>
        <div className={"register form block"}>
            <div className={"register block"}>
                <label htmlFor={"register_name"}>Имя</label>
                <input id={"register_name"} type={"name"}/>
            </div>
            <div className={"register block"}>
                <label htmlFor={"register_surname"}>Фамилия</label>
                <input id={"register_surname"} type={"surname"}/>
            </div>
            <div className={"register block"}>
                <label htmlFor={"register_last_name"}>Отчество</label>
                <input id={"register_last_name"} type={"last_name"}/>
            </div>
        </div>
        <input type={"submit"} id={"submit_register"} className={"register buttons button submit"} onClick={() => performRegister(setMessage)} value={"Зарегистрироваться"}/>
    </div>);

    return l;

}
