import '../tweet-style.scss'

import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "../../interceptors/authTokenProvider"
import ExceptionMessage from "../../components/messages/exceptionMessage/exceptionMessage";

const NewTweet = ({loggedUserData, actionCount, setActionCount}) => {

    const [date, setDate] = useState(new Date());
    const [validationReport, setValidationReport] = useState(null)
    const [tweetToSave, setTweetToSave] = useState({
            title: '',
            message: ''
        }
    )

    useEffect(() => {
            const timer = setInterval(() => setDate(new Date()), 1000);
            return function cleanup() {
                clearInterval(timer)
            }
        }
    );

    const handleNewTweetSubmit = async (event) => {
        event.preventDefault()
        await postNewTweet();
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setTweetToSave({
            ...tweetToSave,
            [event.target.name]: value
        });
    };

    const postNewTweet = () => {
        Axios.post(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/add`,
            {
                title: tweetToSave.title,
                message: tweetToSave.message
            }
        ).then(() => {
                setActionCount(++actionCount)
            }
        ).catch(error => {
                setValidationReport(error.response.data)
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

    return (
        <div>
            <form onSubmit={event => handleNewTweetSubmit(event)}>
                <div className="newTweetUserDetails">Post a tweet</div>
                <div className="newTweetUserDetails">
                    <img className="newTweetAvatar" src={"data:image/png;base64," + loggedUserData.avatar}></img>
                    <div className="newTweetUserDetail">{loggedUserData.username}</div>
                    <div className="newTweetUserDetail">{loggedUserData.firstName} {loggedUserData.lastName}</div>
                    <div
                        className="newTweetUserDetail currentTime">{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                </div>
                <div className="newTweetFormWrapper">
                    <input className="newTweetInput title" type="" name="title" placeholder="Title"
                           value={tweetToSave.username} onChange={event => handleChange(event)}/>
                    <input className="newTweetInput message" type="text" name="message" placeholder="Message"
                           value={tweetToSave.password} onChange={event => handleChange(event)}/>
                </div>
                <div className="formButtonsWrapper">
                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit" value="Submit">Post tweet</button>
                </div>
            </form>
            {generateExceptionMessage()}
        </div>
    )
}

export default NewTweet