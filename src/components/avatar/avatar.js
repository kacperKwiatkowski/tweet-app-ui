import React, {useState, useEffect} from "react";
// import AvatarDefaultImage from "../../static/images/blurredAvaratImage"

import Axios from "axios";
import "../../interceptors/authTokenProvider"

const Avatar = ({userUsername}) => {

    const [imageState, setImageState] = useState()

    const fetchImage = () => {
        Axios.get(process.env.REACT_APP_API_END_POINT + `/images/${userUsername}`,)
        .then(response => {
                if (response.status === 200) {
                    setImageState(response.data)
                }
            }
        )
    }

    
    useEffect(() => {
        fetchImage()}, 
        [userUsername]
    )

    return(
        <div>
            <img className="newTweetAvatar" src={"data:image/png;base64," + imageState}></img>
        </div>
               
    )
}

export default Avatar;