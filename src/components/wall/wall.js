import "./wall-style.scss"

import Thread from "../thread/thread";
import "../../interceptors/authTokenProvider"

const Wall = ({loggedUserData, wall, actionCount, setActionCount}) => {

    

    function distributeThreads() {
        return (
            wall.threads.map((thread, index) => {
                return (
                    <Thread
                        key={index}
                        thread={thread}
                        loggedUserData={loggedUserData}
                        actionCount={actionCount}
                            setActionCount={setActionCount}
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