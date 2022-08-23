import "./exceptionMessage-style.scss"

const ExceptionMessage = ({message, setMessage}) => {

    const mapExceptions = () => {
        return (
            message.validationFailureDetails.map((exception) => {
                    return (
                        <div className={"exceptionMessage"}>
                            {exception}
                        </div>
                    )
                }
            )
        );
    }

    function closeExceptionMessage() {
        setMessage(null)
    }

    return (
        <div className={"exceptionWrapper"}>
            <div className={"exceptionMessageWrapper"}>
                {mapExceptions()}

            </div>
            <div className={"exceptionMessageButtonWrapper"}>
                <button className={"exceptionMessageButton"} onClick={(event) => closeExceptionMessage()}>Close</button>

            </div>
        </div>

    )
}

export default ExceptionMessage;