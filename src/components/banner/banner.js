import './banner-style.scss'

import Login from "../../forms/login/login";
import Register from "../../forms/register/register";
import NewTweet from "../../forms/newTweet/newTweet";
import Axios from "axios";
import "../../interceptors/authTokenProvider"

import {useEffect, useState} from "react";

const Banner = () => {

    const [loggedUserData, setLoggedUserData] = useState(false)

    useEffect(() => {
        fetchLoggedUser()
    }, loggedUserData);

    const fetchLoggedUser = () => {
        Axios.get("http://localhost:8080/api/v.1.0/tweets/logged")
            .then(response => {
                if (response.status === 200) {
                    setLoggedUserData(true)
                }
            }).catch(error => {
            console.error(error)
        })
    }

    function provideAuthentication() {
        if (!loggedUserData) {
            return <>
                <Login></Login>
                <Register></Register>
            </>;
        }
    }

    function provideContent() {
        if (loggedUserData) {
            return <NewTweet></NewTweet>;
        }
    }

    return (
        <div id="banner">
            {provideAuthentication()}
            {provideContent()}
        </div>
    )
}

export default Banner