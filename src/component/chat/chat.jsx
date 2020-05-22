import React from "react";
import Pusher from "pusher-js";
import axios from "axios";
import toast from "toasted-notes";
import { Redirect } from 'react-router-dom';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            to_id: 0,
            from_id: 0,
            message: "",
            loading: false
        };
    }
    componentDidMount() {
        this.getMessage();
        this.eventMessage();
    }
    getMessage = () => {
        axios
            .get("https://murmuring-tundra-59739.herokuapp.com/api/chat", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res => {
                this.setState({
                    data: res.data.chat
                });
            });
    };
    eventMessage = () => {
        try {
            Pusher.logToConsole = true;
            const pusher = new Pusher("aea96431fcf8f1c271cb", {
                cluster: "ap1",
                forceTls: true,
                authTransport: "jsonp",
                authEndpoint: "https://murmuring-tundra-59739.herokuapp.com/broadcasting/auth",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            const channel = pusher.subscribe("chat1");
            channel.bind("App\\Events\\MessageSent", data => {
                console.log("data pusher ::: " + data.message);
                this.setState({
                    id_sender: data.user.id
                });
                this.getMessage();
            });
        } catch (err) {
            console.log(err);
        }
    };
    handleChange = e => {
        this.setState({
            message: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const data = {
            from_id: localStorage.getItem("seller_id"),
            to_id: localStorage.getItem("to_id"),
            message: this.state.message
        };
        axios
            .post("https://murmuring-tundra-59739.herokuapp.com/api/chat", data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res => {
                this.eventMessage();
                this.setState({
                    loading: false
                });
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        Success Sent
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                ));
            });
    };
    render() {
        const chat = this.state.data.filter(
            data => data.to_id === parseInt(localStorage.getItem("id_sender"))
        );
        if(localStorage.getItem('token') === null){
            return <Redirect to="/login"/>
        }
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row" style={{ overflowY: "hidden" }}>
                            {this.state.data.length > 0 ? (
                                chat.map(param => {
                                    return (
                                        <div class="col-12 message-box">
                                            <h5>{param.name}</h5>
                                            <p>{param.message}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div class="col-12">nothing message</div>
                            )}
                        </div>
                        <form onSubmit={this.handleSubmit} className="fixed-bottom">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-10">
                            <div className="row">
                                <div className="col-md-8 col-sm-8">
                                    <div class="form-group">
                                        <div class="floating-label">
                                            <label for="exampleFloatingLabel1">
                                                Floating label
                                            </label>
                                            <input
                                                aria-describedby="exampleFloatingLabel1Help"
                                                class="form-control"
                                                id="exampleFloatingLabel1"
                                                onChange={this.handleChange}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    {this.state.loading ? (
                                        <button className="btn btn-secondary tombol disabled">
                                            LOADING...
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-block btn-primary tombol"
                                            type="submit"
                                        >
                                            Send
                                        </button>
                                    )}
                                </div>
                            </div>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
