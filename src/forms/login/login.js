import './login-style.scss'
import '../form-style.scss'
import '../../App.scss'

import React, {useState} from "react";
import Axios from "axios";

const Login = () => {

    const [credentials, setCredentials] = useState({
            username: '',
            password: ''
        }
    )

    const handleChange = (event) => {
        const value = event.target.value;
        setCredentials({
            ...credentials,
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
                username: credentials.username,
                password: credentials.password
            }
        )
            .then(response => {
                if (response.status === 200) {
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
                <div className="formName">Login</div>
                <input type="text" name="username" placeholder="Username" value={credentials.username}
                       onChange={event => handleChange(event)}/>
                <input type="password" name="password" placeholder="Password" value={credentials.password}
                       onChange={event => handleChange(event)}/>
                <div className="formButtonsWrapper">
                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit" value="Submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login