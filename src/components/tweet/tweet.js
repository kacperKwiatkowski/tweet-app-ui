import "./tweet-style.scss"

import React, {useEffect, useState} from "react";

import Axios from "axios";
import "../../interceptors/authTokenProvider"

const Tweet = ({tweet, allowReply}) => {

    const [date, setDate] = useState(new Date());
    const [loggedUserData, setLoggedUserData] = useState({})


    useEffect(() => {
        fetchLoggedUser()
    }, loggedUserData);


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
        let timer = setInterval(() => setDate(new Date()), 100000);
        return function cleanup() {
            clearInterval(timer)
        }
    });


    const handleLikeTweet = () => {

        Axios.put(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/like/${tweet.tweetId}`,
        )
            .then(response => {

            }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className="tweet">
            <img className="tweetAvatar"
                 src={"data:image/png;base64," + tweet.avatar}></img>
            <div className="tweetDetailsWrapper">
                <div className="tweetUserDetails">

                    <div className="userDetails">{tweet.username}</div>
                    <div className="userDetails">{tweet.firstName} {tweet.lastName}</div>
                    <div
                        className="userDetails currentTime">{tweet.postDateTime}</div>
                </div>
                <div className="tweetUserDetails">
                    <div className="userDetails">{tweet.title}</div>
                    <div className="userDetails">{tweet.message}</div>
                </div>
                <div className="buttonWrapper">

                    <div className="userDetails">{tweet.likeCount}</div>
                    <button className="formButton" type="submit" value="Submit" onClick={handleLikeTweet}>Like</button>
                </div>
            </div>
        </div>
    )
}

export default Tweet