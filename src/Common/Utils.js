import {logoutUser} from "./IdProvider";

export function fetchWithAuth(input, init) {
    return fetch(input, init).then(v => v.json()).then(v => {
        if (!v.success && v.reason === 'reauth') {
            logoutUser();
            document.location = '/login';
        }
        return v;
    })
}