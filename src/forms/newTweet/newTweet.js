import '../tweet-style.scss'

import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "../../interceptors/authTokenProvider"

const NewTweet = () => {

    const [date, setDate] = useState(new Date());
    const [loggedUserData, setLoggedUserData] = useState({})

    const fetchLoggedUser = () => {
        Axios.get("http://localhost:8080/api/v.1.0/tweets/logged")
            .then(response => {
                if (response.status === 200) {
                    setLoggedUserData(response.data)
                }
            }).catch(error => {
            console.error(error)
        })
    }

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer)
        }
    });

    useEffect(() => {
        fetchLoggedUser()
    }, loggedUserData);

    return (
        <div>
            <form>
                <div className="newTweetUserDetails">
                    <img className="newTweetAvatar"
                         src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"></img>
                    <div className="newTweetUserDetail">{loggedUserData.username}</div>
                    <div className="newTweetUserDetail">{loggedUserData.firstName} {loggedUserData.lastName}</div>
                    <div
                        className="newTweetUserDetail currentTime">{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                </div>
                <div className="newTweetFormWrapper">
                    <input className="newTweetInput title" type="" name="title" placeholder="Title"/>
                    <input className="newTweetInput message" type="text" name="message" placeholder="Message"/>
                </div>
            </form>

        </div>
    )
}

export default NewTweet