import "./tweet-style.scss"

import React, {useState} from "react";

import Axios from "axios";
import "../../interceptors/authTokenProvider"
import ExceptionMessage from "../messages/exceptionMessage/exceptionMessage";

const Tweet = ({tweet, loggedUserData, refreshThread}) => {

    const [thisTweet, setThisTweet] = useState(tweet);
    const [validationReport, setValidationReport] = useState(null)
    const [editTweet, setEditTweet] = useState({title: tweet.title, message: tweet.message})

    const handleChange = (event) => {
        const value = event.target.value;
        setEditTweet({
            ...editTweet,
            [event.target.name]: value
        });
    };

    const handleLikeTweet = () => {
        Axios.put(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/like/${thisTweet.tweetId}`,)
            .then(response => {
                    if (response.status === 200) {
                        refreshTweet(thisTweet.tweetId)
                    }
                }
            ).catch(error => {
                if (error.response.status === 400) {
                    console.log(error.response.data)
                    setValidationReport(error.response.data)
                }
            }
        )
    }

    const handleEditTweet = () => {
        Axios.put(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/update/${thisTweet.tweetId}`, editTweet)
            .then(response => {

                console.log(response.status)

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

    const handleDeleteTweet = () => {
        Axios.delete(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/delete/${thisTweet.tweetId}`)
            .then(() => {
                    refreshThread(thisTweet.threadId)
                }
            ).catch(error => {
                if (error.response.status === 400) {
                    console.log(error.response.data)
                    setValidationReport(error.response.data)
                }
            }
        )
    }

    const refreshTweet = () => {
        Axios.get(`http://localhost:8080/api/v.1.0/tweets/${thisTweet.tweetId}/get/tweet`)
            .then(response => {
                    console.log(response.data)
                    setThisTweet(response.data)
                }
            ).catch(error => {
                console.error(error)
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

    function generateEditDeleteButtons() {
        if (loggedUserData.username === thisTweet.username)
            return <>
                <button className="formButton" onClick={() => handleEditTweet()}>Edit</button>
                <button className="formButton" onClick={() => handleDeleteTweet()}>Delete</button>
            </>;
    }

    function generateEditableDetails() {
        if (loggedUserData.username === thisTweet.username) {
            return (
                <div className="tweetUserDetails">
                    <input className="userDetailsEditTitle" type="text" name="title" placeholder="Message"
                           value={editTweet.title} onChange={event => handleChange(event)}/>
                    <input className="userDetailsEditMessage" type="text" name="message" placeholder="Message"
                           value={editTweet.message} onChange={event => handleChange(event)}/>
                </div>
            )

        } else {
            return (
                <div className="tweetUserDetails">
                    <div className="userDetails">{thisTweet.title}</div>
                    <div className="userDetails">{thisTweet.message}</div>
                </div>
            )
        }

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
                    {generateEditableDetails()}
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