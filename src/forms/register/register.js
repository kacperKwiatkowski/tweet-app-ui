import './register-style.scss'
import '../form-style.scss'
import '../../App.scss'
import {useState} from "react";
import Axios from "axios";

const Register = () => {

    const [credentials, setCredentials] = useState(
        {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            contactNumber: '',
            avatar: '',
            password: '',
            passwordConfirm: ''
        }
    )

    const handleChange = (event) => {
        const value = event.target.value;
        setCredentials({
            ...credentials,
            [event.target.name]: value
        });
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()
        await authorize();

    }

    const authorize = () => {

        Axios.post("http://localhost:8080/api/v.1.0/tweets/register",
            {
                username: credentials.username,
                email: credentials.email,
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                contactNumber: credentials.contactNumber,
                avatar: credentials.avatar,
                password: credentials.password,
                passwordConfirm: credentials.passwordConfirm
            }
        )
            .then(response => {
                if (response.status === 200) {

                }
            }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div>
            <form onSubmit={event => handleRegisterSubmit(event)}>
                <div className="formName">Register</div>
                <input type="text" name="username" placeholder="Username" value={credentials.username}
                       onChange={event => handleChange(event)}/>
                <input type="email" name="email" placeholder="Email" value={credentials.email}
                       onChange={event => handleChange(event)}/>
                <input type="text" name="firstName" placeholder="First name" value={credentials.firstName}
                       onChange={event => handleChange(event)}/>
                <input type="text" name="lastName" placeholder="Last name" value={credentials.lastName}
                       onChange={event => handleChange(event)}/>
                <input type="text" name="contactNumber" placeholder="Contact number" value={credentials.contactNumber}
                       onChange={event => handleChange(event)}/>
                <input type="text" name="avatar" placeholder="Avatar" value={credentials.avatar}
                       onChange={event => handleChange(event)}/>
                <input type="password" name="password" placeholder="Password" value={credentials.password}
                       onChange={event => handleChange(event)}/>
                <input type="password" name="passwordConfirm" placeholder="Confirm password"
                       value={credentials.passwordConfirm} onChange={event => handleChange(event)}/>
                <div className="formButtonsWrapper">

                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register