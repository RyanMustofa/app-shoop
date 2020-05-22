import React from "react";
import axios from 'axios';
import toast from "toasted-notes";

class AddImage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            image: null
        }
    }
    handleChange = e => {
        this.setState({
            image: e.target.files[0]
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const formData = new FormData();
        formData.append('product_id',localStorage.getItem('product_id'));
        formData.append('image',this.state.image)
        axios.post("https://murmuring-tundra-59739.herokuapp.com/api/image",formData,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            } 
        }).then(res => {
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        Success Add Image
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
            this.setState({
                loading: false
            })
        }).catch(err => {
                toast.notify(({ onClose }) => (
                    <div
                        style={{ borderRadius: "20px" }}
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                    >
                        Galat Add Image
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
            this.setState({
                loading: false
            })
        })
    }
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
                                Add Image
                            </h4>
                            <div class="form-group">
                                <label for="exampleFormControlFile1">
                                    Example file input
                                </label>
                                <input
                                    type="file"
                                    class="form-control-file"
                                    onChange={this.handleChange}
                                    id="exampleFormControlFile1"
                                />
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

export default AddImage;
