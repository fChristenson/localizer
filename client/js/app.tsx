import * as React from "react";
import * as ReactDom from "react-dom";
import { App } from "./app/App";
import { AppContextProvider } from "./app/AppContext";

ReactDom.render(<AppContextProvider><App /></AppContextProvider>, document.getElementById("root"));
