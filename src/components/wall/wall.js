import "./wall-style.scss"

import Thread from "../thread/thread";

const Wall = () => {

    const threads = [
        {thread: [
                    {
                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    },
                    {

                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    },
                    {
                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    }
                ]},
        {thread: [
                    {
                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    },
                    {

                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    },
                    {
                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    }
                ]},
        {thread: [
                    {
                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    },
                    {

                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    },
                    {
                        tweetId: "test-1-1",
                        username: "username-1-2",
                        title: "title-1-3",
                        message: "message-1-4",
                        likeCount: "likeCount-1-5",
                        postDateTime: "postDateTime-1-6",
                        threadId: "threadId-1-7"
                    }
                ]}
    ]

    function distributeThreads() {
        return (
            threads.map((value, index) => {
                    return (
                            <Thread tweets={value.thread}/>
                    )
                }
            )
        );
    }

    return (
        <div className="wall">
            {distributeThreads()}
        </div>
    )
}

export default Wall