import Raven from "raven-js";
import * as React from "react";
import Helmet from "react-helmet";
import { Request, Response } from "express";
import { StaticRouter } from "react-router-dom";
import * as ReactDOMServer from "react-dom/server";

import { Html } from "../Html";
import { Meta } from "../middleware";
import { Layout } from "../../components";

declare const BASE_URL: string;
const meta: Meta = require("../../../meta.json");

export function renderView(request: Request, response: Response): void {
    const context: { statusCode?: number } = {};

    let body;
    try {
        body = ReactDOMServer.renderToString(
            <StaticRouter context={context} location={request.url}>
                <Layout domain={`${request.protocol}://${request.headers.host}`} />
            </StaticRouter>
        );
    } catch (error) {
        console.error(error);
        Raven.captureException(error);
        return response.redirect(302, "/500");
    }

    if (context.statusCode && context.statusCode >= 200 && context.statusCode < 600) {
        response.statusCode = context.statusCode;
    }

    const helmet = Helmet.renderStatic();

    ReactDOMServer.renderToNodeStream(
        <Html helmet={helmet} version={meta.version}>
            <div id="content-overlay" dangerouslySetInnerHTML={{ __html: body }} />
            <script src={`/static/main.v${meta.version}.js`} async />
        </Html>
    ).pipe<Response>(response.type("html"));
}
