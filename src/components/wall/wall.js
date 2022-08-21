import "./wall-style.scss"

import Thread from "../thread/thread";
import {useEffect, useState} from "react";
import Axios from "axios";
import "../../interceptors/authTokenProvider"

const Wall = () => {

    const [wall, setWall] = useState(
        {
            threads: []
        }
    )

    useEffect(() => {
        fetchWallContent()
    }, wall)

    const fetchWallContent = () => {
        Axios.get("http://localhost:8080/api/v.1.0/tweets/all")
            .then(response => {
                if (response.status === 200) {
                    setWall(response.data)
                }
            }).catch(error => {
            console.error(error)
        })
    }

    function distributeThreads() {
        return (
            wall.threads.map((thread, index) => {
                    return (
                        <Thread
                            key={index}
                            thread={thread}
                        />
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

//[
//         {thread: [
//                     {
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     },
//                     {
//
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     },
//                     {
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     }
//                 ]},
//         {thread: [
//                     {
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     },
//                     {
//
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     },
//                     {
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     }
//                 ]},
//         {thread: [
//                     {
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     },
//                     {
//
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     },
//                     {
//                         tweetId: "test-1-1",
//                         username: "username-1-2",
//                         title: "title-1-3",
//                         message: "message-1-4",
//                         likeCount: "likeCount-1-5",
//                         postDateTime: "postDateTime-1-6",
//                         threadId: "threadId-1-7"
//                     }
//                 ]}
//     ]