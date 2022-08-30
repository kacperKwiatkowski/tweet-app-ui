import './banner-style.scss'

import Login from "../../forms/login/login";
import Register from "../../forms/register/register";
import ForgotPassword from "../../forms/forgotPassword/forgotPassword";
import "../../interceptors/authTokenProvider"

const Banner = ({actionCount, setActionCount}) => {

    return (
        <div id="banner">
            <Login
                actionCount={actionCount}
                setActionCount={setActionCount}></Login>
            <Register
                actionCount={actionCount}
                setActionCount={setActionCount}
            ></Register>
            <ForgotPassword
                actionCount={actionCount}
                setActionCount={setActionCount}
            ></ForgotPassword>
        </div>
    )
}

export default Banner