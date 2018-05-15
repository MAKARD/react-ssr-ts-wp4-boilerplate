import * as React from "react";

export const HTML: React.SFC<{ version: number }> = (props): JSX.Element => {
    return (
        <html>
            <body>
                <div id="content-overlay" >
                    {props.children}
                </div>
                <script src={`/static/main.v${props.version}.js`} async />
                <link rel="stylesheet" href={`/static/styles.v${props.version}.css`} />
            </body>
        </html>
    );
}
