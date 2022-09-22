import React, {useState, useEffect} from "react";
// import AvatarDefaultImage from "../../static/images/blurredAvaratImage"

import Axios from "axios";
import "../../interceptors/authTokenProvider"

const Avatar = ({userUsername}) => {

    const [imageState, setImageState] = useState()

    const fetchImage = () => {
        console.log(userUsername)
        Axios.get(`http://localhost:8080/api/v.1.0/tweets/images/${userUsername}`,)
        .then(response => {
                if (response.status === 200) {
                    setImageState(response.data)
                }
            }
        )
    }

    
    useEffect(() => {
        fetchImage()}, 
        []
    )

    return(
        <div>
            <img className="newTweetAvatar" src={"data:image/png;base64," + imageState}></img>
        </div>
               
    )
}

export default Avatar;