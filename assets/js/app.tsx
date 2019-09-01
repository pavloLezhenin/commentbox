import "../css/app.css";
import "phoenix_html";

import * as React from "react";
import * as ReactDOM from "react-dom";
import Comments from "./components/Comments";
import Login from "./components/login";
import Cookies from 'js-cookie';
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isAuthenticated: false,
        };

        this.handleAuthentication()
        this.setAuth = this.setAuth.bind(this)
    }

    setAuth(username, isAuthenticated) {
        this.setState({
            username: username,
            isAuthenticated: isAuthenticated
        })
    }

    handleAuthentication() {
        let token = Cookies.get('token')
        if (token) {
            axios({
                method: 'post',
                headers: {"Content-Type": "application/json"},
                url: 'http://localhost:4000/validateToken',
                data: {
                    token: token
                }
            })
                .then((response) => {
                    this.setAuth(response.data.username, response.data.isAuthenticated)
                });
        }
    }

    render() {
        return this.state.isAuthenticated ?
            <Comments handler = {this.setAuth} username = {this.state.username} /> :
            <Login handler = {this.setAuth} />
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("comments-app")
)