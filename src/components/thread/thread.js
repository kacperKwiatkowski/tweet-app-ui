import "./thread-style.scss"

import Tweet from "../tweet/tweet"
import ReplyTweet from "../../forms/replyTweet/replyTweet";

const Thread = ({thread, loggedUserData, actionCount, setActionCount}) => {

    function distributeThreads() {
        return (
            thread.tweets.map((tweet, index) => {
                return (
                    <Tweet
                        key={index}
                        tweet={tweet}
                        loggedUserData={loggedUserData}
                        actionCount={actionCount}
                        setActionCount={setActionCount}
                    />
                )
            })
        );
    }


    return (
        <div className="thread">
            {distributeThreads()}
            <ReplyTweet
                mainTweetId={thread.tweets[0].tweetId}
                threadId={thread.tweets[0].threadId}
                loggedUserData={loggedUserData}
                actionCount={actionCount}
                setActionCount={setActionCount}
            />
        </div>
    )
}

export default Thread