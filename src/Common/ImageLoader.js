import React, {useState} from "react";
import "../styles/edit_styles.css"

export function ImageLoader({submit = submitImageToServer, productId, data, setData}) {
    const [image, setImage] = useState(undefined)
    const [message, setMessage] = useState("")
    return (<div className={"edit item image container"} id={"image_loader"}>
        <label htmlFor={"image_loader"}>Загрузить картинку</label>
        {image ? <img className="catalogBig items item img edit"
             src={URL.createObjectURL(image)}
             alt={""}/> : ""}
        <input type="file" name="image" onChange={t => setImage(t.target.files[0])}/>
        {message ? <div className={"account message"} style={{marginTop: "8px"}} id={"account_message"}>{message}</div> : ""}
        <button onClick={() => submit(image, productId, data, setData, setMessage)}>Загрузить картинку</button>
    </div>)
}

export async function submitImageToServer(image, productId, data, setData, setMessage) {
    let reader = new FileReader();
    reader.onloadend = function () {
        fetch(`/api/images/load?productId=${productId}`,
            {
                method: "PUT",
                body: reader.result,
                headers: {accessToken: window.user.accessToken, username: window.user.username}
            })
            .then(t => setTimeout(() => setData({...data, img_count: data.img_count + 1}), 10))
    }
    console.log(image)
    if (!image) {
        setMessage("Вы не выбрали картинку");
        return;
    }
    reader.readAsDataURL(image);

}