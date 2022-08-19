import './login-style.scss'
import '../form-style.scss'
import '../../App.scss'

import React, {useState} from "react";
import Axios from "axios";

const Login = () => {

    const [credentials, setCredentials] = useState({username: '', password: ''})

    const handleLoginSubmit = async (event) => {

        event.preventDefault()

        await authorize();

    }

    const authorize = () => {
        Axios.post("http://localhost:8080/login",
            {
                username: credentials.username,
                password: credentials.password
            }, {
            headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        )
            .then(response => {
                if (response.status === 200) {
                    //TODO Store it in a cookie
                    localStorage.setItem("authorization", response.data.jwt);
                    localStorage.setItem('loggedUser', credentials.username);
                }
            }).catch(error => {
            console.error(error)
        })
    }

    return(
        <div>
            <form onSubmit={event => handleLoginSubmit(event)}>
                <div class="formName">Login</div>
                <input type="text" name="username" placeholder="Username"/>
                <input type="text" name="password" placeholder="Password"/>
                <div className="formButtonsWrapper">
                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login