import Cookies from 'universal-cookie';

const views = ["list", "panels"];

export function setUserView(view) {
    if (views.indexOf(view) > -1) {
        const cookies = new Cookies();
        cookies.set("catalogView", view);
    }
}

export function checkAuth() {
    return fetch(`/api/check_auth?username=${window.user.username}&access_token=${window.user.access_token}`)
        .then(t => t.json())
        .then(j => {
            window.updateUser({loggedIn: j.result});
            console.log(j.result);
            return window.user
        })
        .then(saveUser)
}

export function logoutUser() {
    window.updateUser({access_token: "", loggedIn: false});
}

export function loginUser(username, password) {
    return fetch(`/api/login?username=${username}&password=${password}`, {
        method: "POST"
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
    return fetch(`/api/register?username=${username}&password=${password}&name=${name}&email=${email}`, {
        method: "POST"
    }).then(t => t.json())
}

export function loadUser() {
    const cookies = new Cookies();
    const accessToken = cookies.get("accessToken");
    const loggedIn = cookies.get("loggedIn") === "true";
    const username = cookies.get("username");
    const view = cookies.get("catalogView") ?? "list";
    return {
        loggedIn: loggedIn,
        username: username,
        access_token: accessToken,
        view: view
    };
}

export function saveUser() {
    const cookies = new Cookies();
    cookies.set("accessToken", window.user.access_token);
    cookies.set("username", window.user.username);
    cookies.set("loggedIn", window.user.loggedIn);
    cookies.set("catalogView", window.user.view);
}
