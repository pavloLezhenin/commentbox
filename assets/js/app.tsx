import "../css/app.css";
import "phoenix_html";

import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "./components/Home";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hi there!</h1>
                <Home />
            </div>
        )
    }
}

// This code starts up the React app when it runs in a browser. It sets up the routing
// configuration and injects the app into a DOM element.
ReactDOM.render(<App />, document.getElementById("react-app"));
