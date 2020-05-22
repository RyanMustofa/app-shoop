import React from "react";
import Header from "../../img/header.png";
import axios from "axios";
import toast from "toasted-notes";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: false,
            loading: false,
            email: "",
            password: "",
            name: ""
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        axios
            .post("https://murmuring-tundra-59739.herokuapp.com/api/register", data)
            .then(res => {
                this.setState({
                    loading: false
                });
                console.log(res)
                localStorage.setItem("token", res.data.success.token);
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        Success Register
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
                console.log(message)
                this.setState({
                    loading: false
                });
                const messagerpassword = message ? message.data.error.password : "register gagal";
                const messageremail = message ? message.data.error.email : "register gagal";
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                    >
                        {messagerpassword}  {messageremail}
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
        return (
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
                                <h4 className="text-center text-white">Register</h4>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <div className="floating-label">
                                            <label htmlFor="exampleFloatingLabel">
                                                Name
                                            </label>
                                            <input
                                                aria-describedby="exampleFloatingLabel1Help"
                                                className="form-control"
                                                id="exampleFloatingLabel"
                                                autoComplete="off"
                                                type="text"
                                                required
                                                onChange={this.handleChange}
                                                name="name"
                                            />
                                        </div>
                                    </div>
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
        );
    }
}

export default Register;
