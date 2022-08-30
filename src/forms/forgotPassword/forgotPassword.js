import './forgotPassword-style.scss'
import '../form-style.scss'
import '../../App.scss'

import React, {useState} from "react";
import Axios from "axios";
import ExceptionMessage from "../../components/messages/exceptionMessage/exceptionMessage";

const ForgotPassword = ({actionCount, setActionCount}) => {

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
        setActionCount(++actionCount)
    }

    const authorize = () => {

        Axios.get(`http://localhost:8080/api/v.1.0/tweets/${forgotPasswordData.username}/forgot`,
            {
                username: forgotPasswordData.username
            }
        ).then(response => {

            }
        ).catch(error => {
                setValidationReport(error.response.data)
            }
        )
    }

    function generateExceptionMessage() {
        if (validationReport != null) {
            console.log()
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
                       onChange={event => handleLoginChange(event)}/>
                <div className="formButtonsWrapper">
                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit" value="Submit">Submit</button>
                </div>
            </form>
            {generateExceptionMessage()}
        </div>
    )
}

export default ForgotPassword