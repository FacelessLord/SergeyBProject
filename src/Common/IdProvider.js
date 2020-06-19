import Cookies from 'universal-cookie';
import {Header} from "./Header/Header";
import React from "react";

function createIdBlock() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const c = Math.floor(Math.random() * 10);
    const d = Math.floor(Math.random() * 10);

    return `${a}${b}${c}${d}`
}

function createRandomId() {
    const a = createIdBlock();
    const b = createIdBlock();
    const c = createIdBlock();

    return `${a}-${b}-${c}`
}

// add unique user id request
export function getOrCreateClientId() {
    const cookies = new Cookies();
    const accessToken = cookies.get("accessToken");
    console.log(accessToken);
    if (accessToken)
        return accessToken;
    const newToken = createRandomId();
    cookies.set("accessToken", newToken);
    return newToken
}

export function getUser() {
    return {"loggedIn": true, "username": "Lord_Faceless", "clientId": getOrCreateClientId()}
}
