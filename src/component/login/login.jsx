import React from "react";
import Header from "../../img/header.png";
import axios from "axios";
import toast from "toasted-notes";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: false,
            loading: false,
            email: "",
            password: ""
        };
    }
    showPassword = () => {
        this.setState({
            pass: true
        });
    };
    hidePassword = () => {
        this.setState({
            pass: false
        });
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        axios
            .post("https://murmuring-tundra-59739.herokuapp.com/api/login", data)
            .then(res => {
                this.setState({
                    loading: false
                });
                localStorage.setItem("token", res.data.token.token);
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        Success Login
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
                this.props.history.push("/");
            })
            .catch(err => {
                const message = err.response;
                this.setState({
                    loading: false
                });
                const messager = message ? message.data.error : "login gagal";
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                    >
                        {messager}
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
        if(localStorage.getItem('token')){
            return <Redirect to="/" />
        }
        return (
            <div>
                <div className="body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                                <div>
                                    <img
                                        className="img-fluid img-login"
                                        src={Header}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="kotak">
                                    <h4 className="text-center text-white">Login</h4>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="floating-label">
                                                <label htmlFor="exampleFloatingLabel1">
                                                    Email
                                                </label>
                                                <input
                                                    aria-describedby="exampleFloatingLabel1Help"
                                                    className="form-control"
                                                    id="exampleFloatingLabel1"
                                                    autoComplete="off"
                                                    type="email"
                                                    required
                                                    onChange={this.handleChange}
                                                    name="email"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="floating-label">
                                                <label htmlFor="exampleFloatingLabel2">
                                                    Password
                                                </label>
                                                <input
                                                    aria-describedby="exampleFloatingLabel1Help"
                                                    className="form-control"
                                                    id="exampleFloatingLabel2"
                                                    name="password"
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    required
                                                    type={
                                                        this.state.pass
                                                            ? "text"
                                                            : "password"
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row ml-1">
                                            <button
                                                className="btn btn-float btn-sm bg-light"
                                                onClick={
                                                    this.state.pass
                                                        ? this.hidePassword
                                                        : this.showPassword
                                                }
                                                type="button"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <label className="ml-3 my-auto">
                                                {this.state.pass
                                                    ? "Hide Password"
                                                    : "Show Password"}
                                            </label>
                                        </div>
                                        <div className="row mt-4 ml-1">
                                            {this.state.loading ? (
                                                <button className="disabled btn btn-block btn-secondary tombol">
                                                    LOADING ...
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="btn-primary btn-block tombol btn"
                                                >
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
