import fs from "fs";
import path from "path";

import * as React from "react";
import { ServerStyleSheet } from "styled-components";
import { HelmetData, HelmetHTMLBodyDatum } from "react-helmet";

import { Preloader } from "../components";

export const Html: React.SFC<{ helmet: HelmetData, version: string }> = (props): JSX.Element => {
    const { htmlAttributes, bodyAttributes, title, meta, link, style } = props.helmet;

    const sheet = new ServerStyleSheet();
    const favicons: Array<string> = JSON.parse(
        fs.readFileSync(path.resolve("favicons/favicon-stats.json")).toString()
    ).html;

    const headChildren = [
        sheet.getStyleTags(),
        favicons.join(""),
        title.toString(),
        style.toString(),
        meta.toString(),
        link.toString()
    ];

    return (
        <html {...htmlAttributes.toString()} data-version={props.version}>
            <head dangerouslySetInnerHTML={{ __html: headChildren.join("") }} />
            <body {...bodyAttributes.toString()}>
                {props.children}
                <script dangerouslySetInnerHTML={{ __html: `(${Preloader.staticStyleLoader.toString()})()` }} />
            </body>
        </html>
    );
}
