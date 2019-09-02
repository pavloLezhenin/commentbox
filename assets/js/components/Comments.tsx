import React from "react";
import {Socket} from "phoenix"
import Cookies from 'js-cookie';

import ServerMessage from './ServerMessage';
class Comments extends React.Component {
    private channel: any;
    private socket: any;
    constructor(props) {
        super(props);
        this.state = {
            inputMessage: ""
        }
        this.connectToChannel = this.connectToChannel.bind(this)
        this.logout = this.logout.bind(this)
        this.messagesComponent = React.createRef()
    }

    connectToChannel(){
        this.channel = this.socket.channel("room:comments", {});
        this.channel.join()
            .receive("ok", response => { console.log("Joined successfully", response) })

        this.channel.on("comment", payload => {
            this.messagesComponent.current.loadCommentsFromServer()
        })
    }

    componentDidMount() {
        let connect = this.connectToChannel;
        this.socket = new Socket("/socket", {params:
                {token: Cookies.get("token")}
        });
        this.socket.connect();
        this.socket.conn.onerror  = function(event) {
            console.log("redirecting to login")
        };
        this.socket.conn.onopen  = function(event) {
            connect()
        };
    }

    handleInputMessage(event) {
        this.setState({
            inputMessage: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.channel.push("comment", {message: this.state.inputMessage,
            username: this.props.username,
            date: new Date()})
        this.setState({
            inputMessage: ""
        })
    }

    logout() {
        Cookies.remove("token")
        this.props.handler("", false)
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <div className="field">
                        <label
                            className="label"
                            style={{
                                textAlign: "left"
                            }}
                        >
                            Welcome {this.props.username}!
                            <a onClick={this.logout}>
                                Logout
                            </a>
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                style={{
                                    marginTop: "10px"
                                }}
                                value = {this.state.inputMessage}
                                onChange = {this.handleInputMessage.bind(this)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        value="Submit"
                        className="button is-primary"
                        style={{
                            marginTop: "10px"
                        }}
                    >
                        Submit
                    </button>
                </form>
                <ServerMessage ref={this.messagesComponent} perPage={10} />
            </div>
        )
    }
}
export default Comments
