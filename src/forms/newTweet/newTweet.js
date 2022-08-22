import '../tweet-style.scss'

import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "../../interceptors/authTokenProvider"

const NewTweet = () => {

    const [date, setDate] = useState(new Date());
    const [loggedUserData, setLoggedUserData] = useState({})
    const [tweetToSave, setTweetToSave] = useState({
            title: '',
            message: ''
        }
    )

    const handleChange = (event) => {
        const value = event.target.value;
        setTweetToSave({
            ...tweetToSave,
            [event.target.name]: value
        });
    };

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

    const postNewTweet = () => {
        Axios.post(`http://localhost:8080/api/v.1.0/tweets/${loggedUserData.username}/add`,
            {
                title: tweetToSave.title,
                message: tweetToSave.message
            })
            .then(response => {

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

    const handleNewTweetSubmit = async (event) => {
        event.preventDefault()
        await postNewTweet();
    }

    return (
        <div>
            <form onSubmit={event => handleNewTweetSubmit(event)}>
                <div className="newTweetUserDetails">Post a tweet</div>
                <div className="newTweetUserDetails">
                    <img className="newTweetAvatar"
                         src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"></img>
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

        </div>
    )
}

export default NewTweet