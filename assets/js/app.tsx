import "../css/app.css";
import "phoenix_html";

import * as React from "react";
import * as ReactDOM from "react-dom";
import Comments from "./components/Comments";

class App extends React.Component {
    render() {
        return (
            <Comments/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("comments-app")
)