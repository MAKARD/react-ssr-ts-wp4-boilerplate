import * as React from "react";
import { RouteComponentProps } from "react-router";

export const NotFoundRoute: React.SFC<RouteComponentProps<{}>> = (props) => {
    props.staticContext && (props.staticContext.statusCode = 404);
    return (
        <div>
            404
        </div>
    );
};
