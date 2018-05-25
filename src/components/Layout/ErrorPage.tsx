import * as React from "react";
import { Helmet } from "react-helmet";

export class ErrorPage extends React.Component {
    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Helmet>
                    <title>THIS IS ERROR</title>
                </Helmet>
                <main>
                    SOME ERROR IS HAPPENS
                </main>
            </React.Fragment>
        );
    }
}
