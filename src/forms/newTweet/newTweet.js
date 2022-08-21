import '../tweet-style.scss'

import React, {useEffect, useState} from 'react'

const NewTweet = () => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 100000);
        return function cleanup() {
            clearInterval(timer)
        }

    });

    return (
        <div>
            <form>
                <div className="newTweetUserDetails">
                    <img className="newTweetAvatar"
                         src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"></img>
                    <div className="newTweetUserDetail">H4NN!BAL</div>
                    <div className="newTweetUserDetail">Hannibal Barca</div>
                    <div
                        className="newTweetUserDetail currentTime">{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                </div>
                <div className="newTweetFormWrapper">
                    <input className="newTweetInput title" type="" name="title" placeholder="Title"/>
                    <input className="newTweetInput message" type="text" name="message" placeholder="Message"/>
                </div>
            </form>

        </div>
    )
}

export default NewTweet