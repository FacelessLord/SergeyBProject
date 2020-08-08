import React, {useState} from "react";
import {ImageLoader, submitImageToServer} from "../Common/ImageLoader";

function onImageLoad(event, image, setImage) {
    const files = Array.from(event.target.files)
    return undefined;
}

export function LoadImagePage() {
    return (<div id="content_wrapper">
        <ImageLoader submit={submitImageToServer}/>
    </div>)
}