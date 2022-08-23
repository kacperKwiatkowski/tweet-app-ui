import "./wall-style.scss"

import Thread from "../thread/thread";
import {useEffect, useState} from "react";
import Axios from "axios";
import "../../interceptors/authTokenProvider"

const Wall = ({loggedUserData}) => {

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
                            loggedUserData={loggedUserData}
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