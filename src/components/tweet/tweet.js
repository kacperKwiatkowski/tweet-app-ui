import "./tweet-style.scss"

import React, {useEffect, useState} from "react";

const Tweet = ({tweet, allowReply}) => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 100000);
        return function cleanup() {
            clearInterval(timer)
        }
    });

    function provideReplyButton() {
        if (allowReply) {
            return (
                <div className="buttonWrapper">
                    <button className="replyButton">Reply</button>
                </div>
            )
        } else return null
    }

    return (
        <div className="tweet">
            <div className="tweetUserDetails">
                <img className="tweetAvatar"
                     src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"></img>
                <div className="userDetails">{tweet.username}</div>
                <div className="userDetails">{tweet.firstNa} {tweet.username}</div>
                <div
                    className="userDetails currentTime">{tweet.postDateTime}</div>
            </div>
            <div className="tweetUserDetails">
                <div className="userDetails">{tweet.title}</div>
                <div className="userDetails">{tweet.message}</div>
            </div>
            {provideReplyButton()}
        </div>
    )
}

export default Tweet