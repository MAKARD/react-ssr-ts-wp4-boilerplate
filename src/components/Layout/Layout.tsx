import * as React from "react";
import {Input} from "./Input";
import {StyledInput} from "./StyledInput";

export class Layout extends React.Component {
    public render(): React.ReactNode {
        return (
            <div>
                hello world
                <section>
                    <h2>Simple Input</h2>
                    <Input/>
                </section>
                <section>
                    <h2>Styled Input</h2>
                    <StyledInput/>
                </section>
            </div>
        );
    }
}
