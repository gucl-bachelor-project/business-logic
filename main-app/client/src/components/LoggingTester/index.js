import axios from "axios";
import React, { Component } from "react";
import ReactJson from 'react-json-view';
import "./style.css";

class LoggingTester extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTriggeringError: false,
            errorTriggerRequestSucceeded: null,
            isFetchingAppErrors: false,
            appErrors: null
        };

        this.endpoint = process.env.NODE_ENV === "development"
            ? "http://localhost:8000"
            : window.location.origin;

        this.triggerError = this.triggerError.bind(this);
        this.fetchAllAppErrors = this.fetchAllAppErrors.bind(this);
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

    triggerError(e) {
        e.preventDefault();

        this.setState({ isTriggeringError: true }, () => {
            axios
                .post(`${this.endpoint}/app-errors/trigger`)
                .then(() => {
                    this.setState({
                        errorTriggerRequestSucceeded: false
                    });
                })
                .catch(err => {
                    this.setState({
                        errorTriggerRequestSucceeded:
                            err.response.status === 500 &&
                            err.response.data === "test"
                    });
                })
                .finally(() => {
                    this.setState({
                        isTriggeringError: false
                    });
                });
        });
    }

    fetchAllAppErrors(e) {
        e.preventDefault();

        this.setState({ isFetchingAppErrors: true }, () => {
            axios.get(`${this.endpoint}/app-errors`)
                .then(response => {
                    if (response.status === 200)
                        this.setState({
                            appErrors: response.data ? response.data : {}
                        });
                })
                .catch(err => {
                    alert(`Failed to fetch from endpoint. Error message: ${err.message}`);
                })
                .finally(() => {
                    this.setState({
                        isFetchingAppErrors: false
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
        const { isTriggeringError, errorTriggerRequestSucceeded, isFetchingAppErrors, appErrors } = this.state;


        let errorTriggerResultComponent;
        if (errorTriggerRequestSucceeded !== null)
            errorTriggerResultComponent = (
                <p>
                    Result:{" "}
                    {errorTriggerRequestSucceeded ? (
                        <span className="request-success">
                            Request succeeded
                        </span>
                    ) : (
                            <span className="request-failure">
                                Request did not succeed
                            </span>
                        )}
                    .
                </p>
            );

        let appErrorsResultComponent;
        if (appErrors !== null)
            appErrorsResultComponent = (
                <>
                    <p>Logged errors:</p>
                    <ReactJson
                        name={false}
                        collapsed={collapsed}
                        theme={theme}
                        src={appErrors}
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
                <div>
                    {isTriggeringError ? (
                        <p>Triggering error...</p>
                    ) : (
                            <button onClick={this.triggerError} disabled={isTriggeringError}>
                                Throw an error in application
                            </button>
                        )}
                    {errorTriggerResultComponent}
                </div>
                <br />
                <div>
                    {isFetchingAppErrors ? (
                        <p>Fetching app errors...</p>
                    ) : (
                            <button onClick={this.fetchAllAppErrors}>
                                List the 100 latest app errors
                            </button>
                        )}
                    {appErrorsResultComponent}
                </div>
            </>
        );
    }
}

export default LoggingTester;
