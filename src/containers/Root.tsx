import * as React from "react";
import StateManagement from "./StateManagement";
import Routing from "./Routing"

const Root = () => (
    <StateManagement>
      <div className="custom">
        <Routing />
      </div>
    </StateManagement>
);

export default Root;
