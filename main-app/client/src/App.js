import React, { Component } from "react";
import SupportTester from "./components/SupportTester";
import LoggingTester from "./components/LoggingTester";
import DBAccessTester from "./components/DBAccessTester";
import "./App.css";

class App extends Component {
    render() {
        return (
            <>
                <hr />
                <h1>Test calls to support services</h1>
                <div id="support-testers-container">
                    <SupportTester supportNum="1" />
                    <SupportTester supportNum="2" />
                    <SupportTester supportNum="3" />
                </div>
                <hr />
                <h1>Test logging</h1>
                <LoggingTester />
                <hr />
                <h1>Test DB access</h1>
                <h2>DB #1</h2>
                <DBAccessTester baseEndpointResourcePath="db-1-access" />
                <h2>DB #2</h2>
                <DBAccessTester baseEndpointResourcePath="db-2-access" />
                <hr />
            </>
        );
    }
}

export default App;
