import './banner-style.scss'

import React, { Component }  from 'react';
import Login from "../../forms/login/login";
import Register from "../../forms/register/register";
import ForgotPassword from "../../forms/forgotPassword/forgotPassword";
import "../../interceptors/authTokenProvider"

const Banner = ({setCurrentPhase}) => {

    return (
        <div id="banner">
            <Login
                setCurrentPhase={setCurrentPhase}
            />
            <Register/>
            <ForgotPassword/>
        </div>
    )
}

export default Banner