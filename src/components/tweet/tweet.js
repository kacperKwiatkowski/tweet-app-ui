import "./tweet-style.scss"

import React, {useState} from "react";

import Axios from "axios";
import "../../interceptors/authTokenProvider"

const Tweet = ({tweet, loggedUserData}) => {

    const [thisTweet, setThisTweet] = useState(tweet);

    const handleLikeTweet = (event) => {
        Axios.put(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/like/${thisTweet.tweetId}`,
        )
            .then(() => {
                refreshTweet(thisTweet.tweetId)
            }).catch(error => {
            console.error(error)
        })
    }

    const refreshTweet = () => {
        console.log(thisTweet.tweetId)
        Axios.get(`http://localhost:8080/api/v.1.0/tweets/${thisTweet.tweetId}/get/tweet`,
        )
            .then(response => {
                console.log(response.data)
                setThisTweet(response.data)
            }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className="tweet">
            <img className="tweetAvatar"
                 src={"data:image/png;base64," + thisTweet.avatar}></img>
            <div className="tweetDetailsWrapper">
                <div className="tweetUserDetails">

                    <div className="userDetails">{thisTweet.username}</div>
                    <div className="userDetails">{thisTweet.firstName} {thisTweet.lastName}</div>
                    <div
                        className="userDetails currentTime">{thisTweet.postDateTime}</div>
                </div>
                <div className="tweetUserDetails">
                    <div className="userDetails">{thisTweet.title}</div>
                    <div className="userDetails">{thisTweet.message}</div>
                </div>
                <div className="buttonWrapper">
                    <div className="userDetails">{thisTweet.likeCount}</div>
                    <button className="formButton" onClick={event => handleLikeTweet(event)}>Like</button>
                </div>
            </div>
        </div>
    )
}

export default Tweet