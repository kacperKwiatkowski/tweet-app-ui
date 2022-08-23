import './banner-style.scss'

import Login from "../../forms/login/login";
import Register from "../../forms/register/register";
import NewTweet from "../../forms/newTweet/newTweet";
import "../../interceptors/authTokenProvider"

const Banner = ({loggedUserData}) => {

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
            return <NewTweet loggedUserData={loggedUserData}></NewTweet>;
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