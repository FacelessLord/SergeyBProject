import React from "react";
import {MDBCol, MDBContainer, MDBFooter, MDBRow} from "mdbreact";

export function Footer() {
    return (<MDBFooter color="stylish-color-dark" className="footer wrapper">
        <MDBContainer fluid className="footer container">
            <MDBRow className={"footer row"}>
                <MDBCol md="6" className={"footer column main"}>
                    <h5 className="footer columnHeader">
                        Footer Content
                    </h5>
                    <p>
                        Here you can use rows and columns here to organize your footer
                        content. Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                    </p>
                </MDBCol>
                <hr className="footer hr"/>
                <MDBCol md="2" className={"footer column secondary"}>
                    <h5 className="footer columnHeader">
                        Links
                    </h5>
                    <ul className="footer links">
                        <li>
                            <a href="/">Link 1</a>
                        </li>
                        <li>
                            <a href="/">Link 2</a>
                        </li>
                        <li>
                            <a href="/">Link 3</a>
                        </li>
                        <li>
                            <a href="/">Link 4</a>
                        </li>
                    </ul>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        <hr/>
        <div className="footer copyright">
            <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
            </MDBContainer>
        </div>
    </MDBFooter>)
}
