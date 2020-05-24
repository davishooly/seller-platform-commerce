import * as React from "react";
import StateManagement from "./StateManagement";
import Routing from "./Routing"
import ThemeProvider from "../providers/themes/ThemeProvider";

const Root = () => (
    <ThemeProvider>
        <StateManagement>
            <div className="custom">
                <Routing />
            </div>
        </StateManagement>
    </ThemeProvider>
);

export default Root;
