import React, { Component }  from 'react';

import "./successMessage-style.scss"

const SuccessMessage = ({message, setMessage}) => {

    function closeSuccessMessage() {
        setMessage(null)
    }

    return (
        <div className={"successWrapper"}>
            <div className={"successMessageWrapper"}>
                <div className={"successMessage"}>
                    {message}
                </div>

            </div>
            <div className={"successMessageButtonWrapper"}>
                <button className={"successMessageButton"} onClick={(event) => closeSuccessMessage()}>Close</button>

            </div>
        </div>

    )
}

export default SuccessMessage;