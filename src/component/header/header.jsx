import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            check: false
        }
    }
    componentDidMount(){
        if(localStorage.getItem('token') === null){
            this.setState({
                check: false
            })
        }
        if(localStorage.getItem('token')){
            this.setState({
                check: true
            })
        }
    }
    handleLogin = () => {
        this.setState({
            check: true
        })
        this.props.history.push('/login')
    }
    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id_sender');
        localStorage.removeItem('pusherTransportTLS');
        localStorage.removeItem('seller_id');
        localStorage.removeItem('product_id');
        localStorage.removeItem('to_id');
        this.setState({
            check: false
        })
    }
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <a class="navbar-brand" href="#">
                            Navbar
                        </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i class="fas fa-bars" style={{fontSize: "20px"}}></i>
                        </button>
                        <div
                            class="collapse navbar-collapse "
                            id="navbarNavAltMarkup"
                        >
                            <div class="navbar-nav ml-auto">
                                <Link className="nav-item nav-link" to="/">
                                    Product
                                </Link>
                                <Link className="nav-item nav-link" to="/addproduct">
                                    Add Product
                                </Link>
                                <button className="tombol btn btn-danger tombol" onClick={this.state.check ? this.handleLogout : this.handleLogin}>{this.state.check ? "logout" : "login"}</button>
                                <button className={this.state.check ? "d-none" : "ml-2 tombol btn btn-info tombol"} onClick={() => this.props.history.push('/register')}>Register</button>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="py-4 my-5">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
