import * as React from "react";
import { StaticRouter } from "react-router-dom";
import * as ReactDOMServer from "react-dom/server";
import express, { Request, Response } from "express";

import { HTML } from "./HTML";

import { Layout } from "../components";

const app = express();
app.disable("x-powered-by");

const meta: { version: number } = require("../../meta.json");
const port = process.env.PORT || 8081;

app.get("*", (request: Request, response: Response) => {
    const context: { status?: number } = {};
    if (context.status && context.status >= 200 && context.status < 600) {
        response.statusCode = context.status;
    }

    const body = (
        <HTML version={meta.version}>
            <StaticRouter context={context} location={request.url}>
                <Layout />
            </StaticRouter>
        </HTML>
    );
});
