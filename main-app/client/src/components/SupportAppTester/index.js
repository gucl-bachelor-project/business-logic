import io from "socket.io-client";
import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import {Toast} from "react-bootstrap";
import {getBaseEndpoint} from "../../util/constants";

/**
 * Sends request to main app to process background job in support app.
 *
 * @param supportNum Which support app to test (i.e. 1, 2 or 3)
 */
function testCall(supportNum) {
    return new Promise((resolve, reject) => {
        let socket = io(getBaseEndpoint());

        socket.on("support-call-callback", result => {
            if (result.succeeded) {
                resolve();
            } else {
                reject(result.err);
            }

            socket.close();
        });

        socket.on("connect_error", err => {
            reject(err);
            socket.close();
        });

        socket.emit("support-call-test", {
            serviceNum: parseInt(supportNum)
        });
    });
}

/**
 * Component for support app test call
 */
function SupportAppTester(props) {
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (isLoading) {
            testCall(props.supportNum).then(() => {
                setSuccess(true);
            }).catch(err => {
                setSuccess(false);
                setError(err);
            }).finally(() => {
                setLoading(false);
                setShowResult(true);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <>
            <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >
                {isLoading ? `Waiting for response...` : `Support App #${props.supportNum}`}
            </Button>
            <Toast onClose={() => setShowResult(false)} show={showResult} delay={3000} autohide
                   style={{marginTop: "10px"}}>
                <Toast.Header>Result</Toast.Header>
                <Toast.Body>
                    <p style={{color: isSuccess ? "green" : "red"}}>{isSuccess ? "Success!" : "Failure!"}</p>
                    {!isSuccess && error ? <p>Error: {error.type}.</p> : null}
                </Toast.Body>
            </Toast>
        </>
    );
}

export default SupportAppTester;
