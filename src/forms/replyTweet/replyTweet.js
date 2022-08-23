import './replyTweet-style.scss'

import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "../../interceptors/authTokenProvider"
import ExceptionMessage from "../../components/messages/exceptionMessage/exceptionMessage";

const ReplyTweet = ({mainTweetId, threadId, loggedUserData, refreshThreadAction}) => {

    const [date, setDate] = useState(new Date());
    const [replyTweet, setReplyTweet] = useState({
            title: '',
            message: '',
            threadId: ''
        }
    )
    const [validationReport, setValidationReport] = useState(null)

    const handleChange = (event) => {
        const value = event.target.value;
        setReplyTweet({
            ...replyTweet,
            [event.target.name]: value
        });
    };


    const postReplyTweet = () => {
        Axios.post(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/reply/${mainTweetId}`,
            {
                title: replyTweet.title,
                message: replyTweet.message,
                threadId: threadId
            })
            .then(response => {

                console.log(response.status)

                if (response.status === 201) {
                    console.log(response.data)
                    refreshThreadAction(threadId)
                }
            }).catch(error => {

            console.log(error.response.status)

            if (error.response.status === 400) {
                console.log(error.response.data)
                setValidationReport(error.response.data)
            }
        })
    }

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer)
        }
    });

    const handleNewTweetSubmit = async (event) => {
        event.preventDefault()
        await postReplyTweet();
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

    return (
        <>
            <form className="tweetReply" onSubmit={event => handleNewTweetSubmit(event)}>
                <img className="tweetAvatar"
                     src={"data:image/png;base64," + loggedUserData.avatar}></img>
                <div className="tweetDetailsWrapper">
                    <div className="tweetUserDetails">

                        <div className="userDetails">{loggedUserData.username}</div>
                        <div className="userDetails">{loggedUserData.firstName} {loggedUserData.lastName}</div>
                        <div
                            className="userDetails currentTime">{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                    </div>
                    <div className="tweetUserDetails">
                        <input className="userDetails title" type="" name="title" placeholder="Title"
                               value={replyTweet.username} onChange={event => handleChange(event)}/>
                        <input className="userDetails message" type="text" name="message" placeholder="Message"
                               value={replyTweet.password} onChange={event => handleChange(event)}/>
                    </div>
                    <div className="buttonWrapper">
                        <button className="formButton" type="reset">Reset</button>
                        <button className="formButton" type="submit" value="Submit">Reply</button>
                    </div>
                </div>
            </form>
            {generateExceptionMessage()}
        </>

    )
}

export default ReplyTweet