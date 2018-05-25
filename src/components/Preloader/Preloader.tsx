import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { PreloaderMarkup } from "./PreloaderMarkup";

const LoaderOverlay = styled.div`
    position: absolute;
    font-size: 4em;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 9999;
    opacity: 1;
    transition: all .2s ease;
`;

const SpinnerAnimation = styled(PreloaderMarkup) `
    @keyframes spin {
        to {
            transform: rotate(0deg);
            opacity: 0.2;
        }
        50% {
            transform: rotate(180deg);
            opacity: 1;
        }
        from {
            transform: rotate(360deg);
            opacity: 0.2;
        }
    }
    display: block;
    position: absolute;
    width: 80px;
    height: 80px;
    left: 50%;
    top: 50%;
    margin: -40px 0 0 -40px;
    animation: spin 1.7s linear infinite;
`;

export class Preloader extends React.Component {
    public static readonly staticStyleLoader = () => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `/static/styles.v${document.documentElement.getAttribute("data-version")}.css`;
        link.onload = () => document.body.setAttribute("data-loaded", "true");

        document.addEventListener("DOMContentLoaded", () => document.body.appendChild(link));
    }

    public static readonly show = () => document.body.setAttribute("data-loaded", "true");
    public static readonly hide = () => document.body.removeAttribute("data-loaded");

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Helmet>
                    <style>{`
                        #content-overlay {
                            height: 100%;
                            overflow: hidden;
                        }
                        body[data-loaded="true"] #content-overlay {
                            overflow: inherit;
                            overflow: inherit;
                        }
                    `}
                    </style>
                </Helmet>
                <div id="preloader">
                    <LoaderOverlay>
                        <SpinnerAnimation />
                    </LoaderOverlay>
                </div>
                {this.props.children}
            </React.Fragment>
        );
    }
}
