import './register-style.scss'
import '../form-style.scss'
import '../../App.scss'
import React, {useState} from "react";
import Axios from "axios";
import ExceptionMessage from "../../components/messages/exceptionMessage/exceptionMessage";

const Register = () => {

    const [registerDataAvatarFile, setRegisterDataAvatarFile] = useState()
    const [registerData, setRegisterData] = useState(
        {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            contactNumber: '',
            password: '',
            passwordConfirm: ''
        }
    )
    const [validationReport, setValidationReport] = useState(null)

    const handleRegisterChange = (event) => {
        const value = event.target.value;
        setRegisterData({
            ...registerData,
            [event.target.name]: value
        })
        console.log(registerData);
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()
        await authorize();

    }

    const onFileChangeHandler = (e) => {

        console.log(registerData);
        e.preventDefault();
        setRegisterDataAvatarFile(e.target.files[0])

        console.log(registerData);
    }

    const authorize = () => {
        const formData = new FormData();
        formData.append("username", registerData.username)
        formData.append("email", registerData.email)
        formData.append("firstName", registerData.firstName)
        formData.append("lastName", registerData.lastName)
        formData.append("contactNumber", registerData.contactNumber)
        formData.append("avatar", registerDataAvatarFile)
        formData.append("password", registerData.password)
        formData.append("passwordConfirm", registerData.passwordConfirm)

        Axios.post("http://localhost:8080/api/v.1.0/tweets/register", formData)
            .then(response => {
                if (response.status === 200) {

                }
            }).catch(error => {

            console.log(error.response.status)
            console.log(error.response.data)
            setValidationReport(error.response.data)
        })
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
            <form encType="multipart/form-data" onSubmit={event => handleRegisterSubmit(event)}>
                <div className="formName">Register</div>
                <input type="text" name="username" placeholder="Username" value={registerData.username}
                       onChange={event => handleRegisterChange(event)}/>
                <input type="email" name="email" placeholder="Email" value={registerData.email}
                       onChange={event => handleRegisterChange(event)}/>
                <input type="text" name="firstName" placeholder="First name" value={registerData.firstName}
                       onChange={event => handleRegisterChange(event)}/>
                <input type="text" name="lastName" placeholder="Last name" value={registerData.lastName}
                       onChange={event => handleRegisterChange(event)}/>
                <input type="text" name="contactNumber" placeholder="Contact number" value={registerData.contactNumber}
                       onChange={event => handleRegisterChange(event)}/>
                <input type="file" name="file" placeholder="avatar" value={registerData.file}
                       onChange={event => onFileChangeHandler(event)}/>
                <input type="password" name="password" placeholder="Password" value={registerData.password}
                       onChange={event => handleRegisterChange(event)}/>
                <input type="password" name="passwordConfirm" placeholder="Confirm password"
                       value={registerData.passwordConfirm} onChange={event => handleRegisterChange(event)}/>
                <div className="formButtonsWrapper">

                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit">Submit</button>
                </div>
            </form>
            {generateExceptionMessage()}
        </div>
    )
}

export default Register