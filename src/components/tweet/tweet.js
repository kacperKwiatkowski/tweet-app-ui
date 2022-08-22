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

    return (
        <div className="tweet">
            <img className="tweetAvatar"
                 src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"></img>
            <div className="tweetDetailsWrapper">
                <div className="tweetUserDetails">

                    <div className="userDetails">{tweet.username}</div>
                    <div className="userDetails">{tweet.firstNa} {tweet.username}</div>
                    <div
                        className="userDetails currentTime">{tweet.postDateTime}</div>
                </div>
                <div className="tweetUserDetails">
                    <div className="userDetails">{tweet.title}</div>
                    <div className="userDetails">{tweet.message}</div>
                </div>
                <div className="buttonWrapper">
                    <button className="formButton" type="submit" value="Submit">Like</button>
                </div>
            </div>
        </div>
    )
}

export default Tweet