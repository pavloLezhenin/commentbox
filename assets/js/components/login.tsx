import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';

class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    handleUsername(event) {
        this.setState({ username: event.target.value })
    }

    handleSubmit (event) {
        event.preventDefault();
        let handler = this.props.handler
        axios({
            method: 'post',
            headers: {"Content-Type": "application/json"},
            url: 'http://localhost:4000/login',
            data: {
                username: this.state.username
            }
        })
        .then((response) => {
            Cookies.set('token', response.data.token, { expires: 1 });
            handler(response.data.username, true)
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value = {this.state.username}
                                onChange = {this.handleUsername.bind(this)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        value="Submit"
                        className="button is-primary"
                    >
                        Login
                    </button>
                </form>
            </div>
        )
    }
}
export default Login
