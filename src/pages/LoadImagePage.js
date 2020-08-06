import React, {useState} from "react";
import {ImageLoader, submitImageToServer} from "../Common/ImageLoader";

function onImageLoad(event, image, setImage) {
    const files = Array.from(event.target.files)
    console.log(files[0])
    return undefined;
}

export function LoadImagePage() {
    return (<div id="content_wrapper">
        <ImageLoader submit={submitImageToServer}/>
    </div>)
}