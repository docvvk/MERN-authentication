import React, { Component } from "react";
import Login from "../components/Login"

const loginPage = (props) => (
        <div className="row" id="login-div">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row justify-content-center">
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    
)

export default loginPage;
