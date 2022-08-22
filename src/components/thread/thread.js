import "./thread-style.scss"

import Tweet from "../tweet/tweet"
import ReplyTweet from "../../forms/replyTweet/replyTweet";

const Thread = ({thread}) => {

    function distributeThreads() {

        let allowReply = true;

        return (
            thread.tweets.map((tweet, index) => {
                return (
                    <Tweet
                        key={index}
                        tweet={tweet}
                        allowReply={allowReply}
                    />
                )
            })
        );
    }

    console.log(thread)
    return (
        <div className="thread">
            {distributeThreads()}
            <ReplyTweet
                mainTweetId={thread.tweets[0].tweetId}
                threadId={thread.tweets[0].threadId}
            />
        </div>
    )
}

export default Thread