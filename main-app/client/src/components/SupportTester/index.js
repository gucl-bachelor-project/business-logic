import React, {Component} from "react";
import io from "socket.io-client";
import "./style.css";

class SupportTester extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            lastTestCallResult: null
        };

        this.testCall = this.testCall.bind(this);
    }

    testCall(e) {
        e.preventDefault();

        this.setState({isLoading: true}, () => {
            let endpoint =
                process.env.NODE_ENV === "development"
                    ? "localhost:8000"
                    : window.location.origin;
            let socket = io(endpoint);

            socket.on("support-call-callback", result => {
                this.setState({
                    isLoading: false,
                    lastTestCallResult: result.succeeded
                });

                socket.close();
            });

            socket.on("connect_error", () => {
                this.setState({
                    isLoading: false,
                    lastTestCallResult: false
                });

                socket.close();
            });

            socket.emit("support-call-test", {
                serviceNum: parseInt(this.props.supportNum)
            });
        });
    }

    render() {
        const {isLoading, lastTestCallResult} = this.state;
        let lastTestResultElement;

        if (lastTestCallResult !== null)
            lastTestResultElement = (
                <p>
                    Last test result:{" "}
                    {lastTestCallResult ? (
                        <span className="test-success">success</span>
                    ) : (
                        <span className="test-failure">failure</span>
                    )}
                </p>
            );

        return (
            <div className="support-tester-item">
                <h2>Support {this.props.supportNum}</h2>
                {isLoading ? (
                    <p>Testing...</p>
                ) : (
                    <button onClick={this.testCall} disabled={isLoading}>
                        Test call
                    </button>
                )}
                {lastTestResultElement}
            </div>
        );
    }
}

export default SupportTester;
