import React from "react";
import {Header} from "./Header.js"
import {ResourceDescription} from "./ResourceDescription";
import cat1 from "./img/cat1.jpg"
import cat2 from "./img/cat1.jpg"
import cat3 from "./img/cat2.jpeg"
import cat4 from "./img/cat3.jpeg"
import cat5 from "./img/cat5.jpg"
import cat6 from "./img/cat6.jpeg"
import {ItemCard, ItemCardList} from "./ItemCard";
import {Abutton} from "./AButton";
import Cookies from 'universal-cookie';

const img = [cat1, cat2, cat3, cat4, cat5, cat6];

function createIdBlock() {
    const a=Math.floor(Math.random() * 10);
    const b=Math.floor(Math.random() * 10);
    const c=Math.floor(Math.random() * 10);
    const d=Math.floor(Math.random() * 10);

    return `${a}${b}${c}${d}`
}

function createRandomId() {
    const a = createIdBlock();
    const b = createIdBlock();
    const c = createIdBlock();

    return `${a}-${b}-${c}`
}

function getOrCreateClientId() {
    const cookies = new Cookies();
    const accessToken = cookies.get("accessToken");
    console.log(accessToken);
    if (accessToken)
        return accessToken;
    const newToken = createRandomId();
    cookies.set("accessToken", newToken);
    return newToken
}

export function MainPage() {
    const clientId = getOrCreateClientId();

    return (
        <div id="page">
            <Header loggedIn={true} username={"Lord_Faceless"} clientId={clientId}/>
            <div id="content_wrapper">
                <div className="main">
                    <ResourceDescription/>
                    <span className="catalog header">
                    Каталог:
                    </span>
                    <div className="main pad">
                        <ItemCard cardId={1} img={img[1]} header={"Рыжий кот с зелёными глазами"}
                                  provider={"Мама-кошка"} price={"бесценно"} inStock={true}/>
                        <ItemCard cardId={2} img={img[2]} header={"Котёнок с голубыми глазами"}
                                  provider={"Мама-кошка"} price={"бесценно"} inStock={true}/>
                        <ItemCard cardId={3} img={img[3]} header={"Просто красивый котик"}
                                  provider={"Мама-кошка"} price={"бесценно"} inStock={true}/>
                        <ItemCard cardId={4} img={img[4]} header={"Просто красивый котик"}
                                  provider={"Мама-кошка"} price={"бесценно"} inStock={true}/>
                    </div>
                    <div className="main pad list">
                        <ItemCardList cardId={1} img={img[1]} header={"Рыжий кот с зелёными глазами"}
                                      provider={"Мама-кошка"} price={"бесценно"} inStock={true}/>
                        <ItemCardList cardId={2} img={img[2]} header={"Котёнок с голубыми глазами"}
                                      provider={"Мама-кошка"} price={"бесценно"} inStock={true}/>
                        <ItemCardList cardId={3} img={img[3]} header={"Просто красивый котик"}
                                      provider={"Мама-кошка"} price={"бесценно"} inStock={true}/>
                        <ItemCardList cardId={4} img={img[4]} header={"Просто красивый котик"}
                                      provider={"Мама-кошка"} price={"бесценно"} inStock={true}/>
                    </div>
                    <Abutton className="main button more" href={"/catalog"}>
                        Показать полностью
                    </Abutton>
                </div>
            </div>
        </div>
    )
}
