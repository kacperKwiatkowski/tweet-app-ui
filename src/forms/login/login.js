import './login-style.scss'
import '../form-style.scss'
import '../../App.scss'

import React, {useState} from "react";
import Axios from "axios";

const Login = () => {

    const [loginData, setLoginData] = useState({
            username: '',
            password: ''
        }
    )

    const handleLoginChange = (event) => {
        const value = event.target.value;
        setLoginData({
            ...loginData,
            [event.target.name]: value
        });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        await authorize();
    }

    const authorize = () => {

        Axios.post("http://localhost:8080/api/v.1.0/tweets/login",
            {
                username: loginData.username,
                password: loginData.password
            }
        )
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("authorization", response.data.jwt);
                    localStorage.setItem('loggedUser', loginData.username);
                }
            }).catch(error => {
            console.error(error)
        })
    }

    return(
        <div>
            <form onSubmit={event => handleLoginSubmit(event)}>
                <div className="formName">Login</div>
                <input type="text" name="username" placeholder="Username" value={loginData.username}
                       onChange={event => handleLoginChange(event)}/>
                <input type="password" name="password" placeholder="Password" value={loginData.password}
                       onChange={event => handleLoginChange(event)}/>
                <div className="formButtonsWrapper">
                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit" value="Submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login