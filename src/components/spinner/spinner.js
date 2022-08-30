import React from "react";
import "./spinner-style.scss";

const Spinner = () => {
    return (
        <div className={"loading-spinner-wrapper"}>
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
        </div>
    );
}

export default Spinner