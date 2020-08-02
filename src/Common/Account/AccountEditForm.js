import React, {useEffect} from "react";

async function getUserData() {
    return fetch(`/api/user/data?username=${window.user.username}&accessToken=${window.user.accessToken}`)
        .then(t => t.json())
        .catch(_ => {
        })
}

function CharacteristicField({field, setField, id, text}) {
    return [<label key={0} htmlFor={"account_" + id}>{text}</label>,
        <input type={"text"} value={field} onChange={t => setField(t.target.value)} key={1}
               className={"account field " + id}
               id={"account_" + id}/>]
}

async function loadUserData(setUserData) {
    const data = await getUserData()
    for (let i = 0; i < 3; i++) {
        if (data.name[i] == null)
            data.name[i] = ""
    }
    setUserData(data)
}

function getSetNameFunction(data, setData, id) {
    return value => {
        const newName = [...data.name]
        newName[id] = value
        setData({...data, name: newName})
    }
}

export function AccountEditForm({userData, setUserData, message}) {
    useEffect((() => {
        if (userData.email === "")
            loadUserData(setUserData)
    }))
    return (<div className={"account form"}>
        {message ? <div className={"account message"} id={"account_message"}>{message}</div> : ""}
        <div className={"account block"}>
            <label htmlFor={"account_username"}>Логин</label>
            <span className={"account field disabled login"} id={"account_username"}>{window.user.username}</span>
            <label htmlFor={"account_email"}>EMail</label>
            <span className={"account field disabled email"} id={"account_email"}>{userData.email}</span>
        </div>
        <div className={"account block name"}>
            <CharacteristicField field={userData.name[0]} setField={getSetNameFunction(userData, setUserData, 0)}
                                 id={"name"} text={"Имя"}/>
            <CharacteristicField field={userData.name[1]} setField={getSetNameFunction(userData, setUserData, 1)}
                                 id={"surname"} text={"Фамилия"}/>
            <CharacteristicField field={userData.name[2]} setField={getSetNameFunction(userData, setUserData, 2)}
                                 id={"last_name"} text={"Отчество"}/>
        </div>
        <div className={"account block dates"}>
            <label htmlFor={"account_created"}>Зарегистрирован</label>
            <span className={"account field disabled created"} id={"account_created"}>{userData.created}</span>
            <label htmlFor={"account_lastUpdate"}>Последнее обновление</label>
            <span className={"account field disabled lastUpdate"} id={"account_lastUpdate"}>{userData.lastUpdate}</span>
        </div>
    </div>)
}