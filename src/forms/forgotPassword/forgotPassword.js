import './forgotPassword-style.scss'
import '../form-style.scss'
import '../../App.scss'

import React, {useState} from "react";
import Axios from "axios";
import ExceptionMessage from "../../components/messages/exceptionMessage/exceptionMessage";
import SuccessMessage from "../../components/messages/successMessage/successMessage";

const ForgotPassword = () => {

    const [successReport, setSuccessReport] = useState(null)
    const [forgotPasswordData, setForgotPasswordData] = useState({
            username: ''
        }
    )
    const [validationReport, setValidationReport] = useState(null)

    const handleLoginChange = (event) => {
        const value = event.target.value;
        setForgotPasswordData({
            ...forgotPasswordData,
            [event.target.name]: value
        });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        await authorize();
    }

    const authorize = () => {

        Axios.get(process.env.REACT_APP_API_END_POINT + `/${forgotPasswordData.username}/forgot`,
            {
                username: forgotPasswordData.username
            }
        ).then(response => {
                if (response.status === 200) {
                    setSuccessReport(`Email with new password has been sent.`)
                }
            }
        ).catch(error => {
                setValidationReport(error.response.data)
            }
        )
    }

    function generateSuccessMessage() {
        if (successReport != null) {
            return (
                <SuccessMessage
                    message={successReport}
                    setMessage={setSuccessReport}
                />
            )
        }
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
                <div className="formName">Forgot password</div>
                <input type="text" name="username" placeholder="Username" value={forgotPasswordData.username}
                       onChange={event => handleLoginChange(event)} data-testid="forgot-password-username"/>
                <div className="formButtonsWrapper">
                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit" value="Submit">Submit</button>
                </div>
            </form>
            {generateSuccessMessage()}
            {generateExceptionMessage()}
        </div>
    )
}

export default ForgotPassword