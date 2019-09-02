import React from "react";
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'
import ReactPaginate from 'react-paginate';
import axios from "axios";

import en from 'javascript-time-ago/locale/en'

class ServerMessage extends React.Component {
    constructor(props) {
        super(props)
        JavascriptTimeAgo.locale(en)

        this.state = {
            messages: [],
            offset: 0,
            pageCount: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this)
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this)
    }

    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil(selected * Number(this.props.perPage));
        this.setState({offset: offset}, function() {
            this.loadCommentsFromServer();
        })
    };

    componentDidMount() {
        this.loadCommentsFromServer()
    }

    loadCommentsFromServer() {
        axios({
            method: 'get',
            headers: {"Content-Type": "application/json"},
            url: 'http://localhost:4000/comments?perPage=' + this.props.perPage + '&offset=' + this.state.offset,
        })
            .then((response) => {
                this.setState({
                    messages: response.data.messages,
                    pageCount: response.data.pageCount
                })
            });
    }

    render() {
        const messages = this.state.messages.map((message, index) => {
            return (
                <div className="box" style={{marginBottom: "10px"}} key={index}>
                    <article className="media">
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>{message.username}</strong>
                                    <br/>
                                    {message.index}   {message.message}
                                    <br/>
                                    <ReactTimeAgo date={new Date(message.date)}/>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            )
        });

        return (
            <div
                className="flex-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flexoffset",
                    justifyContent: "flexoffset",
                    margin: "auto",
                    width: "100%"
                }}
            >
                {messages}
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        )
    }
}

export default ServerMessage
