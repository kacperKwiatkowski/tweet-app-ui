import './replyTweet-style.scss'

import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "../../interceptors/authTokenProvider"
import ExceptionMessage from "../../components/messages/exceptionMessage/exceptionMessage";
import Avatar from "../../components/avatar/avatar";

const ReplyTweet = ({mainTweetId, threadId, loggedUserData, actionCount, setActionCount}) => {

    const [date, setDate] = useState(new Date());
    const [validationReport, setValidationReport] = useState(null)
    const [replyTweet, setReplyTweet] = useState({
            title: '',
            message: '',
            threadId: ''
        }
    )

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setReplyTweet({
            ...replyTweet,
            [event.target.name]: value
        });
    };

    const postReplyTweet = () => {
        Axios.post(process.env.REACT_APP_API_END_POINT + `/${loggedUserData.username}/reply/${mainTweetId}`,
            {
                title: replyTweet.title,
                message: replyTweet.message,
                threadId: threadId
            }
        ).then(() => {
                setActionCount(++actionCount)
                setReplyTweet({
                    title: '',
                    message: '',
                    threadId: ''
                })
            }
        ).catch(error => {
                if (error.response.status === 400) {
                    setValidationReport(error.response.data)
                }
            }
        )
    }

    const handleNewTweetSubmit = async (event) => {
        event.preventDefault()
        await postReplyTweet();
    }

    function generateExceptionMessage() {
        if (validationReport != null) {
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
                
            <Avatar userUsername={loggedUserData.username} />
                <div className="tweetDetailsWrapper">
                    <div className="tweetUserDetails">

                        <div className="userDetails">{loggedUserData.username}</div>
                        <div className="userDetails">{loggedUserData.firstName} {loggedUserData.lastName}</div>
                        <div
                            className="userDetails currentTime">{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                    </div>
                    <div className="tweetUserDetails">
                        <input className="userDetails title" type="" name="title" placeholder="Title"
                               value={replyTweet.title} onChange={event => handleChange(event)}/>
                        <input className="userDetails message" type="text" name="message" placeholder="Message"
                               value={replyTweet.message} onChange={event => handleChange(event)}/>
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