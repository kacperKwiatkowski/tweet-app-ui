import "./thread-style.scss"

import Tweet from "../tweet/tweet"
import ReplyTweet from "../../forms/replyTweet/replyTweet";
import {useState} from "react";
import Axios from "axios";

const Thread = ({thread, loggedUserData}) => {

    const [thisThread, setThisThread] = useState(thread);

    const refreshThread = (threadId) => {
        console.log(threadId)
        Axios.get(`http://localhost:8080/api/v.1.0/tweets/${threadId}/get/thread`,
        )
            .then(response => {

                console.log(response.data)

                if (response.status === 200) {
                    setThisThread(response.data)
                }
            }).catch(error => {
            console.error(error)
        })
    }

    function distributeThreads() {

        let allowReply = true;

        return (
            thisThread.tweets.map((tweet, index) => {
                return (
                    <Tweet
                        key={index}
                        tweet={tweet}
                        allowReply={allowReply}
                        loggedUserData={loggedUserData}
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