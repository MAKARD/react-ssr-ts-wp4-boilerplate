import * as React from "react";

export const HTML: React.SFC<{ version: number }> = (props): JSX.Element => {
    return (
        <html>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
            </head>
            <body>
                <div id="content-overlay" />
                <script src={`/static/main.v${props.version}.js`} async />
                <link rel="stylesheet" href={`/static/styles.v${props.version}.css`} />
            </body>
        </html>
    );
}
