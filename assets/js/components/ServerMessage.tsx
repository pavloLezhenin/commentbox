import React from "react";
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

class ServerMessage extends React.Component {
    constructor(props) {
        super(props)
        JavascriptTimeAgo.locale(en)
    }

    render() {
        return (
            <div className="box" style={{ marginBottom: "10px" }}>
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{this.props.username}</strong>
                                <br/>
                                {this.props.message}
                                <br/>
                                <ReactTimeAgo date={new Date(this.props.date)}/>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

export default ServerMessage
