import "./tweet-style.scss"

import React, {useState} from "react";

import Axios from "axios";
import "../../interceptors/authTokenProvider"
import ExceptionMessage from "../messages/exceptionMessage/exceptionMessage";

const Tweet = ({tweet, loggedUserData}) => {

    const [thisTweet, setThisTweet] = useState(tweet);
    const [validationReport, setValidationReport] = useState(null)

    const handleLikeTweet = (event) => {
        Axios.put(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/like/${thisTweet.tweetId}`,
        )
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    refreshTweet(thisTweet.tweetId)
                }

            }).catch(error => {

            console.log(error.response.status)

            if (error.response.status === 400) {
                console.log(error.response.data)
                setValidationReport(error.response.data)
            }
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

    function generateEditDeleteButtons() {
        if (loggedUserData.username === thisTweet.username)
            return <>
                <button className="formButton" onClick={event => handleLikeTweet(event)}>Edit</button>
                <button className="formButton" onClick={event => handleLikeTweet(event)}>Delete</button>
            </>;
    }

    return (
        <>
            <div className="tweet">
                <img className="tweetAvatar"
                     src={"data:image/png;base64," + thisTweet.avatar}></img>
                <div className="tweetDetailsWrapper">
                    <div className="tweetUserDetails">

                        <div className="userDetails">{thisTweet.username}</div>
                        <div className="userDetails">{thisTweet.firstName} {thisTweet.lastName}</div>
                        <div className="userDetails">Like count: {thisTweet.likeCount}</div>
                        <div className="userDetails currentTime">{thisTweet.postDateTime}</div>
                    </div>
                    <div className="tweetUserDetails">
                        <div className="userDetails">{thisTweet.title}</div>
                        <div className="userDetails">{thisTweet.message}</div>
                    </div>
                    <div className="buttonWrapper">

                        {generateEditDeleteButtons()}
                        <button className="formButton" onClick={event => handleLikeTweet(event)}>Like</button>
                    </div>
                </div>
            </div>
            {generateExceptionMessage()}
        </>

    )
}

export default Tweet