import React, {useState} from "react";
import {Header} from "../Common/Header/Header.js"
import {ResourceDescription} from "./ResourceDescription";
import {Catalog} from "../Common/Catalog/Catalog";
import {getUser} from "../Common/IdProvider";
import {Link} from "react-router-dom";
import {Footer} from "../Common/Footer/Footer";
import {PanelButtons, UserPanel} from "../Common/Header/UserPanel";


export function MainPage() {
    const user = getUser();
    const [view, setView] = useState(user.view);
    return (
        <div id="page">
            <Header user={user}/>
            <div id="content_wrapper">
                <div className="site main panel">
                    <ResourceDescription/>
                    <Catalog type={view}/>
                    <Link to={"/catalog"} className="catalog buttons button more">
                        Показать полностью
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


