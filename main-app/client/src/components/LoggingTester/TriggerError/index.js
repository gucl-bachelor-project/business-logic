import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Toast} from "react-bootstrap";
import {getBaseEndpoint} from "../../../util/constants";

/**
 * Component to trigger an error in main app
 */
function TriggerError() {
    const [isTriggeringError, setTriggeringError] = useState(false);
    const [isErrorResult, setIsErrorResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (isTriggeringError) {
            axios
                .post(`${getBaseEndpoint()}/app-errors/trigger`)
                .then(() => {
                    setIsErrorResult(false);
                })
                .catch(err => {
                    const isTriggerSuccessful = err.response && err.response.status === 500 && err.response.data === "test";

                    setErrorMessage(!isTriggerSuccessful ? err.message : null);
                    setIsErrorResult(isTriggerSuccessful);
                })
                .finally(() => {
                    setTriggeringError(false);
                    setShowResult(true);
                });
        }
    }, [isTriggeringError]);

    const handleClick = () => setTriggeringError(true);

    return (
        <>
            <Button
                variant="primary"
                disabled={isTriggeringError}
                onClick={!isTriggeringError ? handleClick : null}
            >
                {isTriggeringError ? `Waiting for response...` : `Trigger an error in application`}
            </Button>
            <Toast onClose={() => setShowResult(false)} show={showResult} delay={3000} autohide
                   style={{marginTop: "10px"}}>
                <Toast.Header>Result</Toast.Header>
                <Toast.Body>
                    <p style={{color: isErrorResult ? "green" : "red"}}>{isErrorResult ? "Success!" : "Failure!"}</p>
                    {errorMessage ? <p>Error message: {errorMessage}.</p> : null}
                </Toast.Body>
            </Toast>
        </>
    );
}

export default TriggerError;
