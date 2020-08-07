import Cookies from 'universal-cookie';

const views = ["list", "panels"];

export function setUserView(view) {
    if (views.indexOf(view) > -1) {
        const cookies = new Cookies();
        cookies.set("catalogView", view, {path: "/"});
    }
}

export function checkAuth() {
    return fetch(`/api/user/check_auth`,
        {
            headers: {accessToken: window.user.accessToken, username: window.user.username}
        })
        .then(t => t.json())
        .then(j => {
            window.updateUser({loggedIn: j.result});
            console.log(j.result);
            return window.user
        })
        .then(saveUser)
}

export function logoutUser() {
    window.updateUser({accessToken: "", loggedIn: false, permission: 0});
}

export function loginUser(username, password) {
    return fetch(`/api/user/login`, {
        method: "POST",
        headers: {username: username, password: password}
    }).then(t => t.json())
}

export async function registerUser(username, name, email, password) {
    if (email === "") {
        return {success: false, reason: "noemail"}
    }
    if (username === "") {
        return {success: false, reason: "nousername"}
    }
    if (password.length < 6) {
        return {success: false, reason: "shortpassword"}
    }
    return fetch(`/api/user/register`, {
        method: "POST",
        headers: {username: username, password: password, name:name, email:email}
    }).then(t => t.json())
}

export function loadUser() {
    const cookies = new Cookies();
    const accessToken = cookies.get("accessToken");
    const loggedIn = cookies.get("loggedIn") === "true";
    const username = cookies.get("username");
    const permission = cookies.get("permission");
    const view = cookies.get("catalogView") ?? "list";
    return {
        loggedIn: loggedIn,
        username: username,
        accessToken: accessToken,
        view: view,
        permission: permission
    };
}

export function saveUser() {
    const cookies = new Cookies();
    cookies.set("accessToken", window.user.accessToken, {path: "/"});
    cookies.set("username", window.user.username, {path: "/"});
    cookies.set("loggedIn", window.user.loggedIn, {path: "/"});
    cookies.set("permission", window.user.permission, {path: "/"});
    cookies.set("catalogView", window.user.view, {path: "/"});
}
