import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

import './old_styles/styles.css';
import './styles/header_styles.css';
import './styles/catalog_styles.css';
import './old_styles/footer_styles.css';
import Main from "./Main";
import {createBrowserHistory} from 'history'

function importRemote(url) {
    const resource = document.createElement("script");
    resource.async = true;
    resource.src = url;
    document.children[0].appendChild(resource);
    return resource
}

const fa = importRemote('https://use.fontawesome.com/4b2a7d7bba.js');
const gf = importRemote('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

const history = createBrowserHistory({});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter history={history}>
            <Main/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

