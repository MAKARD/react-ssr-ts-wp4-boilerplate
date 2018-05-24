import * as React from "react";

export interface InputState {
    value: string;
}

export interface InputProps {
    className?: string;
}

export class Input extends React.PureComponent<InputProps, InputState> {
    public readonly state: InputState = {
        value: "",
    };

    public render(): React.ReactNode {
        return <input className={this.props.className} value={this.state.value} onChange={this.handleChange}/>;
    }

    protected handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.currentTarget.value});
    }
}
