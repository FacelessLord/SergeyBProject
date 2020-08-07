import React from "react";


export function Img({onImgRemove, ...props}) {
    return (<div className="edit image container">
        <img src={props.src}/>
        <button className="edit image remove" style={{display: "inline"}} onClick={onImgRemove}>&#215;</button>
    </div>)
}

// export function Img({onRemove, ...props}) {
//     return (<div className={"edit image container"}>
//         <img className={props.className}
//              src={props.src}
//              alt={props.alt}/>
//         <a className={"edit image remove"}>×</a>
//     </div>)
// }