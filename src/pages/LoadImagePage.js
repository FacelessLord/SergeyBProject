import React, {useState} from "react";

function onImageLoad(event, image, setImage) {
    const files = Array.from(event.target.files)
    console.log(files[0])
    return undefined;
}

export function LoadImagePage() {
    const [image, setImage] = useState(undefined)
    const [productId, setProductId] = useState(0)
    return (<div id="content_wrapper">
        <input type="file" name="image" onChange={t => setImage(t.target.files[0])}/>
        <input type="text" name="product" value={productId} onChange={e => setProductId(e.target.value)}/>
        <button onClick={() => submit(image, productId)}>Send image</button>
    </div>)
}

async function submit(image, productId) {
    let reader = new FileReader();
    reader.onloadend = function () {
        fetch(`/api/images/load?username=${window.user.username}&accessToken=${window.user.accessToken}&productId=${productId}`,
            {
                method: "PUT",
                body: reader.result,
            })
    }
    reader.readAsDataURL(image);

}