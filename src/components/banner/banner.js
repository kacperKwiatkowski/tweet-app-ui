import './banner-style.scss'

import Login from "../../forms/login/login";
import Register from "../../forms/register/register";
import NewTweet from "../../forms/newTweet/newTweet";

const Banner = () => {

    return(
        <div id="banner">
            <Login></Login>
            <Register></Register>
            <NewTweet></NewTweet>
        </div>
    )
}

export default Banner