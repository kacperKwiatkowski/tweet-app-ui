import "./thread-style.scss"

import Tweet from "../tweet/tweet"

const Thread = ({tweets}) => {

    function distributeThreads() {

        let allowReply = true;

        return (
            tweets.map((value, index) => {
                if(index!==0) allowReply = false

                return (
                        <Tweet
                            key="index"
                            tweet={value}
                            allowReply={allowReply}
                        />
                )
            })
        );
    }

    return (
        <div className="thread">
            {distributeThreads()}
        </div>
    )
}

export default Thread