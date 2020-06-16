import React from "react";
import PropTypes from 'prop-types';

export function Abutton(props) {
    const {href, className, id, children} = props;
    return <button className={className} id={id} onClick={() => {document.location = href}} >{children}</button>
}

Abutton.props = {href:PropTypes.string, id: PropTypes.string};
