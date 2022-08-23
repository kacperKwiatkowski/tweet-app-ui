import "./thread-style.scss"

import Tweet from "../tweet/tweet"
import ReplyTweet from "../../forms/replyTweet/replyTweet";
import {useState} from "react";
import Axios from "axios";

const Thread = ({thread, loggedUserData, fetchWallContent}) => {

    const [thisThread, setThisThread] = useState(thread);

    const refreshThread = (threadId) => {

        console.log(thisThread.tweets.length)

        if (thisThread.tweets.length < 2) {
            console.log("WALL IS BEING REFRESHED")
            fetchWallContent()
        } else {
            console.log("WALL IS NOT BEING REFRESHED")

            Axios.get(`http://localhost:8080/api/v.1.0/tweets/${threadId}/get/thread`)
                .then(response => {
                    if (response.status === 200) setThisThread(response.data)
                }).catch(error => {
                console.error(error)
            })
        }
    }

    function distributeThreads() {
        return (
            thisThread.tweets.map((tweet, index) => {
                return (
                    <Tweet
                        key={index}
                        tweet={tweet}
                        loggedUserData={loggedUserData}
                        refreshThread={refreshThread}
                        refreshWall={fetchWallContent}
                    />
                )
            })
        );
    }


    return (
        <div className="thread">
            {distributeThreads()}
            <ReplyTweet
                mainTweetId={thisThread.tweets[0].tweetId}
                threadId={thisThread.tweets[0].threadId}
                loggedUserData={loggedUserData}
                refreshThreadAction={refreshThread}
            />
        </div>
    )
}

export default Thread