import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactJson from 'react-json-view';
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
 * Component to load all data for specific resource.
 */
function ListData(props) {
    const [isLoading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (isLoading) {
            axios.get(`${getBaseEndpoint()}/${props.resourcePath}`)
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
                (!result && errorMessage ? <p style={{color: "red"}}>{errorMessage}</p> : null)
            }
            <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >
                {isLoading ? `Waiting for response...` : `Load data`}
            </Button>
        </>
    );
}

export default ListData;

/*
class ListData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            resultData: null
        };

        this.onFetchRequest = this.onFetchRequest.bind(this);
    }

    static defaultProps = {
        src: null,
        collapsed: true,
        collapseStringsAfter: 15,
        displayObjectSize: true,
        enableClipboard: false,
        indentWidth: 4,
        displayDataTypes: false,
        iconStyle: "triangle"
    };

    onFetchRequest(event) {
        event.preventDefault();

        this.setState({isLoading: true}, () => {
            let endpoint =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:8000"
                    : window.location.origin;

            axios.get(`${endpoint}/${this.props.endpointResourcePath}`)
                .then(response => {
                    if (response.status === 200)
                        this.setState({
                            resultData: response.data ? response.data : {}
                        });
                })
                .catch(err => {
                    alert(`Failed to fetch from endpoint. Error message: ${err.message}`);
                })
                .finally(() => {
                    this.setState({
                        isLoading: false
                    });
                });
        });
    }

    render() {
        const {
            collapseStringsAfter,
            displayObjectSize,
            enableClipboard,
            theme,
            iconStyle,
            collapsed,
            indentWidth,
            displayDataTypes
        } = this.props;
        const {isLoading, resultData} = this.state;

        let resultDataVisualizer;
        if (resultData !== null)
            resultDataVisualizer = (
                <>
                    <p>Result:</p>
                    <ReactJson
                        name={false}
                        collapsed={collapsed}
                        theme={theme}
                        src={resultData}
                        collapseStringsAfterLength={collapseStringsAfter}
                        displayObjectSize={displayObjectSize}
                        enableClipboard={enableClipboard}
                        indentWidth={indentWidth}
                        displayDataTypes={displayDataTypes}
                        iconStyle={iconStyle}
                    />
                </>
            );

        return (
            <>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <button onClick={this.onFetchRequest} disabled={isLoading}>Get data</button>
                )}
                {resultDataVisualizer}
            </>
        );
    }
}

export default ListData;
*/
