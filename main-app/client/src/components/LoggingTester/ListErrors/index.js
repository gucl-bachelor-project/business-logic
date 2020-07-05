import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactJson from "react-json-view";
import {getBaseEndpoint} from "../../../util/constants";
import {Button} from "react-bootstrap";

/**
 * Properties for JSON view.
 */
const defaultJsonViewProps = {
    src: null,
    collapsed: true,
    collapseStringsAfter: 15,
    displayObjectSize: true,
    enableClipboard: false,
    indentWidth: 4,
    displayDataTypes: false,
    iconStyle: "triangle"
};

/**
 * Component to fetch and list all logged errors.
 */
function ListErrors() {
    const [isLoading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (isLoading) {
            axios.get(`${getBaseEndpoint()}/app-errors`)
                .then(response => {
                    if (response.status !== 200) {
                        setErrorMessage("No data returned from endpoint.");
                        setResult(null);

                        return;
                    }

                    setResult(response.data ? response.data : {});
                })
                .catch(err => {
                    setErrorMessage(`Failed to fetch from endpoint. Error message: ${err.message}.`);
                    setResult(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    });

    const handleClick = () => setLoading(true);

    return (
        <>
            {result ?
                <ReactJson
                    name={false}
                    collapsed={defaultJsonViewProps.collapsed}
                    theme={defaultJsonViewProps.theme}
                    src={result}
                    collapseStringsAfterLength={defaultJsonViewProps.collapseStringsAfter}
                    displayObjectSize={defaultJsonViewProps.displayObjectSize}
                    enableClipboard={defaultJsonViewProps.enableClipboard}
                    indentWidth={defaultJsonViewProps.indentWidth}
                    displayDataTypes={defaultJsonViewProps.displayDataTypes}
                    iconStyle={defaultJsonViewProps.iconStyle}
                />
                :
                <p style={{color: "red"}}>{errorMessage}</p>
            }
            <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >
                {isLoading ? `Waiting for response...` : `Load errors`}
            </Button>
        </>
    );
}

export default ListErrors;
