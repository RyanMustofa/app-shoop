import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./component/login/login";
import Register from "./component/register/register";
import Header from "./component/header/header";
import Dashboard from "./component/dashboard/dashboard";
import AddProduct from "./component/addProduct/addProduct";
import AddImage from "./component/addImage/addImage";
import Chat from './component/chat/chat';
import DetailProduct from './component/detailProduct/detailProduct';

function App() {
    return (
        <div>
            <Switch>
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Header>
                    <Route path="/addproduct" exact component={AddProduct} />
                    <Route path="/addimage" exact component={AddImage} />
                    <Route path="/chat" exact component={Chat} />
                    <Route path="/product/:id" exact component={DetailProduct} />
                    <Route path="/" exact component={Dashboard} />
                </Header>
                <Route path="/" exact component={Header} />
            </Switch>
        </div>
    );
}

export default App;
