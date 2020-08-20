import React from "react";
import {Link} from "react-router-dom";
import "../../styles/account_styles.css"
import {fetchWithAuth} from "../Utils";

export function EditAccountButton() {
    return (<Link className={"account buttons button edit"} to={"/account/edit"}>Редактировать</Link>)
}

async function saveUserData(userData) {
    return await fetchWithAuth(`/api/user/data`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {accessToken: window.user.accessToken, username: window.user.username}
    })
}

export function AccountFinishEditButton({userData, setMessage}) {
    return [<Link key={0} className={"account buttons button edit"} to={"/account/edit"}
                  onClick={() => {
                      saveUserData(userData)
                          .then(t => t.success ? document.getElementById("account_submit_changes").click() : setMessage("Can't save user data"))
                  }}>
        Сохранить
    </Link>, <Link key={1} id={"account_submit_changes"} style={{display: "none"}} to={"/account"}/>]
}
