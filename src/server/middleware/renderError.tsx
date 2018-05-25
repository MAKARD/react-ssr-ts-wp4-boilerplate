import * as React from "react";
import Helmet from "react-helmet";
import { StaticRouter } from "react-router";
import { Request, Response } from "express";
import * as ReactDOMServer from "react-dom/server";

import { Html } from "../Html";
import { Meta } from "../middleware";
import { ErrorPage } from "../../components";

const meta: Meta = require("../../../meta.json");

export function renderError(request: Request, response: Response): void {
    const context: { statusCode?: number } = {};

    const body = ReactDOMServer.renderToString(
        <StaticRouter context={context} location={request.url}>
            <ErrorPage />
        </StaticRouter>
    );

    if (context.statusCode && context.statusCode >= 200 && context.statusCode < 600) {
        response.statusCode = context.statusCode;
    }

    const helmet = Helmet.renderStatic();

    ReactDOMServer.renderToNodeStream(
        <Html helmet={helmet} version={meta.version}>
            <div id="content-overlay" dangerouslySetInnerHTML={{ __html: body }} />
        </Html>
    ).pipe<Response>(response.type("html"));
}
