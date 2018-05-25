import "../styles/main.scss"

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Layout } from "./components";

declare const DEVELOPMENT: boolean;
const container = document.getElementById("content-overlay");
const renderMethod = DEVELOPMENT ? ReactDOM.render : ReactDOM.hydrate;

if (!container) {
    // tslint:disable-next-line
    console.error("Can not found element for mounting Layout!");
} else {
    renderMethod(
        <BrowserRouter>
            <Layout domain={location.origin}/>
        </BrowserRouter>,
        container
    );
}
