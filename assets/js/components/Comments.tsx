import React from "react";
import {Socket} from "phoenix"

import ServerMessage from './ServerMessage';
class Comments extends React.Component {
    private channel: any;
    state: { inputMessage: string; messages: any[]; };
    constructor() {
        super();
        this.state = {
            inputMessage: "",
            messages: []
        }

        let socket = new Socket("/socket", {params:
                {token: window.userToken}
        });
        socket.connect();

        this.channel = socket.channel("room:comments", {});
    }

    componentDidMount() {
        this.channel.join()
            .receive("ok", response => { console.log("Joined successfully", response) })

        this.channel.on("comment", payload => {
            this.setState({
                messages: this.state.messages.concat(payload.body)
            })
        })
    }

    handleInputMessage(event) {
        this.setState({
            inputMessage: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.channel.push("comment", {body: this.state.inputMessage})
        this.state.inputMessage = ""
    }

    render() {
        const messages = this.state.messages.map((message, index) => {
            return (
                <ServerMessage
                    key = { index }
                    username = { "Server" }
                    message = { message }
                />
            )
        });


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
                            Chat With Phoenix:
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
                <div
                    className="flex-container"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flexStart",
                        justifyContent: "flexStart",
                        margin: "auto",
                        width: "100%"
                    }}
                >
                    {messages}
                </div>
            </div>
        )
    }
}
export default Comments
