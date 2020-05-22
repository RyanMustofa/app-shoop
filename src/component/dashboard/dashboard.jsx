import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Dashboard extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        axios
            .get("https://murmuring-tundra-59739.herokuapp.com/api/product")
            .then(res => {
                console.log(res)
                if(this._isMounted){
                this.setState({
                    loading: false
                });
                }
                this.setState({
                    data: res.data.product
                })
            })
            .catch(err => {
                if(this._isMounted){
                this.setState({
                    loading: false
                });
                }
            });
        axios
            .get("https://murmuring-tundra-59739.herokuapp.com/api/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res => {
                if(this._isMounted){
                localStorage.setItem("seller_id", res.data.user.id);

                }
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleClick = (id) => {
        this.props.history.push('/product/' + id);
    }
    render() {
        return (
            <div>
                <div className="row">
                    {this.state.data.length > 0 ? (
                        this.state.data.map(param => {
                            return (
                                <div class="col-md-3 col-sm-2 col-lg-3">
                                    <div class="card" style={{width: "18rem"}}>
                                        <img
                                            class="card-img-top img-fluid"
                                            height="200"
                                            src={param.image.length > 0 ?
                                                param.image[0].url
                                            :
                                                    "dont have image"
                                            }
                                            alt="Card image cap"
                                        />
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                {param.product_name}
                                            </h5>
                                            <p class="card-text">
                                                {param.product_description}
                                            </p>
                                            <h5>{param.product_price}</h5>
                                            <a onClick={() => this.handleClick(param.id)} class="btn btn-primary tombol">
                                                Buy
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div class="col">
                            <h4>dont have data</h4>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
