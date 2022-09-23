import '../tweet-style.scss'

import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "../../interceptors/authTokenProvider"
import ExceptionMessage from "../../components/messages/exceptionMessage/exceptionMessage";
import SuccessMessage from "../../components/messages/successMessage/successMessage";
import Avatar from "../../components/avatar/avatar";

const NewTweet = ({loggedUserData, actionCount, setActionCount}) => {

    const [date, setDate] = useState(new Date());
    const [successReport, setSuccessReport] = useState(null)
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
        Axios.post(process.env.REACT_APP_API_END_POINT + `/${loggedUserData.username}/add`,
            {
                title: tweetToSave.title,
                message: tweetToSave.message
            }
        ).then(() => {
                setSuccessReport("New tweet posted")
                setActionCount(actionCount+1)
               // window.location.reload(false);
            }
        ).catch(error => {
                setValidationReport(error.response.data)
            }
        )
    }

    function generateSuccessMessage() {
        if (successReport != null) {
            return (
                <SuccessMessage
                    message={successReport}
                    setMessage={setSuccessReport}
                />
            )
        }
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
        <div>
            <form onSubmit={event => handleNewTweetSubmit(event)}>
                <div className="newTweetUserDetails">Post a tweet</div>
                <div className="newTweetUserDetails">
                    <Avatar userUsername={loggedUserData.username} />
                    <div className="newTweetUserDetail">{loggedUserData.username}</div>
                    <div className="newTweetUserDetail">{loggedUserData.firstName} {loggedUserData.lastName}</div>
                    <div
                        className="newTweetUserDetail currentTime">{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                </div>
                <div className="newTweetFormWrapper">
                    <input className="newTweetInput title" type="" name="title" placeholder="Title"
                           value={tweetToSave.username} onChange={event => handleChange(event)} data-testid="new-tweet-title"/>
                    <input className="newTweetInput message" type="text" name="message" placeholder="Message"
                           value={tweetToSave.password} onChange={event => handleChange(event)} data-testid="new-tweet-message"/>
                </div>
                <div className="formButtonsWrapper">
                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit" value="Submit">Post tweet</button>
                </div>
            </form>
            {generateSuccessMessage()}
            {generateExceptionMessage()}
        </div>
    )
}

export default NewTweet