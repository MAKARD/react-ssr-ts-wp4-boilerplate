import * as React from "react";
import { StaticRouter } from "react-router-dom";
import * as ReactDOMServer from "react-dom/server";
import express, { Request, Response } from "express";

import { HTML } from "./HTML";

import { Layout } from "../components";

declare const PORT;
const app = express();
const meta: { version: number } = require("../../meta.json");

app.use("/static", express.static(process.cwd() + "/web"));
app.disable("x-powered-by");

app.get("*", (request: Request, response: Response) => {
    const context: { status?: number } = {};
    if (context.status && context.status >= 200 && context.status < 600) {
        response.statusCode = context.status;
    }

    const body = ReactDOMServer.renderToString(
        <HTML version={meta.version}>
            <StaticRouter context={context} location={request.url}>
                <Layout />
            </StaticRouter>
        </HTML>
    );

    response.send(body).status(200).end();
});

app.listen(PORT, () => {
    console.log(`Listeting on ${PORT}`);
});
