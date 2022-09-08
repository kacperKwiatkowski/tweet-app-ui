import './login-style.scss'
import '../form-style.scss'
import '../../App.scss'

import React, {useState} from "react";
import Axios from "axios";
import ExceptionMessage from "../../components/messages/exceptionMessage/exceptionMessage";
import {PHASES} from "../../constants/phases";

const Login = ({setCurrentPhase}) => {

    const [loginData, setLoginData] = useState({
            username: '',
            password: ''
        }
    )
    const [validationReport, setValidationReport] = useState(null)

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
        ).then(response => {
                if (response.status === 200) {
                    localStorage.setItem("authorization", response.data.jwt);
                    localStorage.setItem('loggedUser', loginData.username);
                }
                window.location.reload(false);
            }
        ).catch(error => {
                setValidationReport(error.response.data)
                setCurrentPhase(PHASES.NOT_AUTHENTICATED)
            }
        )
    }

    function generateExceptionMessage() {
        if (validationReport != null) {
            return (
                <ExceptionMessage
                    message={validationReport}
                    setMessage={setValidationReport}
                />
            )
        }
    }

    return (
        <div>
            <form onSubmit={event => handleLoginSubmit(event)}>
                <div className="formName">Login</div>
                <input role="input" type="text" name="username" placeholder="Username" value={loginData.username}
                       onChange={event => handleLoginChange(event)} data-testid="login-username"
                />
                <input type="password" name="password" placeholder="Password" value={loginData.password}
                       onChange={event => handleLoginChange(event)} data-testid="login-password"/>
                <div className="formButtonsWrapper">
                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit" value="Submit" data-testid="login-submit">Submit</button>
                </div>
            </form>
            {generateExceptionMessage()}
        </div>
    )
}

export default Login