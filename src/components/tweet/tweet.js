import "./tweet-style.scss"

import React, {useState} from "react";

import Axios from "axios";
import "../../interceptors/authTokenProvider"
import ExceptionMessage from "../messages/exceptionMessage/exceptionMessage";

const Tweet = ({tweet, loggedUserData, actionCount, setActionCount}) => {

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
        Axios.put(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/like/${tweet.tweetId}`,)
            .then(response => {
                    if (response.status === 200) {
                        setActionCount(++actionCount)
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
        Axios.put(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/update/${tweet.tweetId}`, editTweet)
            .then(response => {
                    setActionCount(++actionCount)
                }
            ).catch(error => {
                if (error.response.status === 400) {
                    console.log(error.response.data)
                    setValidationReport(error.response.data)
                }
            }
        )
    }

    const handleDeleteTweet = () => {
        Axios.delete(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/delete/${tweet.tweetId}`)
            .then(() => {
                setActionCount(++actionCount)
                }
            ).catch(error => {
                if (error.response.status === 400) {
                    setValidationReport(error.response.data)
                }
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
        if (loggedUserData.username === tweet.username)
            return <>
                <button className="formButton" onClick={() => handleEditTweet()}>Edit</button>
                <button className="formButton" onClick={() => handleDeleteTweet()}>Delete</button>
            </>;
    }

    function generateEditableDetails() {
        if (loggedUserData.username === tweet.username) {
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
                    <div className="userDetails">{tweet.title}</div>
                    <div className="userDetails">{tweet.message}</div>
                </div>
            )
        }

    }

    return (
        <>
            <div className="tweet">
                <img className="tweetAvatar"
                     src={"data:image/png;base64," + tweet.avatar}></img>
                <div className="tweetDetailsWrapper">
                    <div className="tweetUserDetails">

                        <div className="userDetails">{tweet.username}</div>
                        <div className="userDetails">{tweet.firstName} {tweet.lastName}</div>
                        <div className="userDetails">Like count: {tweet.likeCount}</div>
                        <div className="userDetails currentTime">{tweet.postDateTime}</div>
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