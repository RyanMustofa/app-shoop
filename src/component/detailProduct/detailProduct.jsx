import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class DetailProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: [],
            data: []
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get("https://murmuring-tundra-59739.herokuapp.com/api/product/" + id)
            .then(res => {
                console.log(res);
                localStorage.setItem("id_sender", res.data.data.seller_id);
                this.setState({
                    data: res.data.data,
                    image: res.data.image
                });
                localStorage.setItem("to_id", res.data.data.seller_id);
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="row justify-content-center">
                            {this.state.image.length > 0 ? (
                                this.state.image.map(param => {
                                    return (
                                        <div className="col-md-4 col-sm-4">
                                            <img
                                                className="img-fluid"
                                                src={param.url}
                                                height="200"
                                                style={{ width: "200px" }}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center">
                                    not have image
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-12 col-sm-12 detailproduct">
                        <div className="title">{this.state.data.product_name}</div>
                        <div className="description">
                            {this.state.data.product_description}
                        </div>
                        <div className="price">
                            {this.state.data.product_price}
                        </div>
                    </div>
                    <div className="col-12">
                        <Link
                            className="btn btn-primary tombol"
                            to="/chat"
                        >Chat Seller</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailProduct;
