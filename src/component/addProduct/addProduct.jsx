import React from "react";
import axios from "axios";
import toast from "toasted-notes";

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            product_name: "",
            product_description: "",
            product_price: 0
        };
    }
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
            seller_id: localStorage.getItem("seller_id"),
            product_name: this.state.product_name,
            product_description: this.state.product_description,
            product_price: this.state.product_price
        };
        axios
            .post("https://murmuring-tundra-59739.herokuapp.com/api/product", data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res => {
                localStorage.setItem('product_id',res.data.success.id)
                this.setState({
                    loading: false
                });
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        Success Add Product
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
                this.props.history.push('/addimage');
            })
            .catch(err => {
                console.log(err.response);
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                    >
                        Galat Add Product
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
        if(localStorage.getItem('token') === null){
            return (
                <div class="container">
                    <div className="alert alert-warning">
                        please login now
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form
                            class="kotak-product"
                            onSubmit={this.handleSubmit}
                        >
                            <h4 className="text-center text-white">
                                Add Product
                            </h4>
                            <div class="form-group">
                                <div class="floating-label">
                                    <label
                                        class="text-white"
                                        for="exampleFloatingLabel1"
                                    >
                                        PRODUCT NAME
                                    </label>
                                    <input
                                        aria-describedby="exampleFloatingLabel1Help"
                                        class="form-control"
                                        id="exampleFloatingLabel1"
                                        onChange={this.handleChange}
                                        type="text"
                                        name="product_name"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="floating-label">
                                    <label
                                        class="text-white"
                                        for="exampleFloatingLabel1"
                                    >
                                        PRODUCT DESCRIPTION
                                    </label>
                                    <input
                                        aria-describedby="exampleFloatingLabel1Help"
                                        class="form-control"
                                        id="exampleFloatingLabel1"
                                        onChange={this.handleChange}
                                        type="text"
                                        name="product_description"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="floating-label">
                                    <label
                                        class="text-white"
                                        for="exampleFloatingLabel1"
                                    >
                                        PRODUCT PRICE
                                    </label>
                                    <input
                                        aria-describedby="exampleFloatingLabel1Help"
                                        class="form-control"
                                        id="exampleFloatingLabel1"
                                        type="number"
                                        onChange={this.handleChange}
                                        name="product_price"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                {this.state.loading ? (
                                    <button class="btn btn-block btn-secondary tombol">
                                        LOADING...
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-block btn-primary tombol"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProduct;
