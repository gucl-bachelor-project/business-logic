import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import DBTester from "./components/DBTester";
import SupportAppTester from "./components/SupportAppTester";
import TriggerError from "./components/LoggingTester/TriggerError";
import ListErrors from "./components/LoggingTester/ListErrors";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Bachelor Project – Test Site</Navbar.Brand>
                </Navbar>
                <br/>
                <div style={{margin: "10px"}}>
                    <h3>Test Calls to Support Apps</h3>
                    <hr/>
                    <p>
                        <i>Click on a button to perform a test call to one of the support apps (i.e. simulating
                            processing a background job) in the business logic subsystem.
                        </i>
                    </p>
                    <div className="d-flex justify-content-start">
                        <div className="p-2"><SupportAppTester supportNum="1"/></div>
                        <div className="p-2"><SupportAppTester supportNum="2"/></div>
                        <div className="p-2"><SupportAppTester supportNum="3"/></div>
                    </div>
                    <div style={{marginTop: "50px"}}>
                        <h3>Test Logging</h3>
                        <hr/>
                        <p><i>Click on the button below to trigger an error in the application.</i></p>
                        <TriggerError/>
                        <div style={{marginTop: "25px"}}>
                            <h5>Logged Errors</h5>
                            <p><i>Click on the button below to list all logged errors.</i></p>
                            <ListErrors/>
                        </div>
                    </div>
                    <div style={{marginTop: "50px"}}>
                        <h3>Test Database</h3>
                        <hr/>
                        <p><i>Create and load data for different resources in each database below.</i></p>
                        <div style={{marginTop: "25px"}}>
                            <h5>Database #1</h5>
                            <DBTester baseEndpointResourcePath="db-1-access"/>
                        </div>
                        <div style={{marginTop: "25px"}}>
                            <h5>Database #2</h5>
                            <DBTester baseEndpointResourcePath="db-2-access"/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;
