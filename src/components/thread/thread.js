import "./thread-style.scss"

import Tweet from "../tweet/tweet"
import NewTweet from "../../forms/newTweet/newTweet";

const Thread = ({thread}) => {

    // const [thread, setThread] = useState(
    //     {
    //         tweets: []
    //     }
    // )
    //
    // useEffect(() => {
    //     console.log("EFFECT -> REFRESH")
    //     setThread(_thread)
    // }, thread)

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
            <NewTweet></NewTweet>
        </div>
    )
}

export default Thread