import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import SupportAppTester from "./components/SupportAppTester";
import TriggerError from "./components/LoggingTester/TriggerError";
import ListErrors from "./components/LoggingTester/ListErrors";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Test Site</Navbar.Brand>
                </Navbar>
                <br/>
                <div style={{margin: "10px"}}>
                    <h3>Test Calls to Support Apps</h3>
                    <hr/>
                    <p>Click on any of the buttons below to perform a test call to one of the support apps (i.e.
                        simulating processing a background job) in the business logic subsystem.</p>
                    <div className="d-flex justify-content-start">
                        <div className="p-2"><SupportAppTester supportNum="1"/></div>
                        <div className="p-2"><SupportAppTester supportNum="2"/></div>
                        <div className="p-2"><SupportAppTester supportNum="3"/></div>
                    </div>
                    <div style={{marginTop: "50px"}}>
                        <h3>Test Logging</h3>
                        <hr/>
                        <TriggerError/>
                        <div style={{marginTop: "20px"}}/>
                        <ListErrors/>
                    </div>
                </div>
            </>
        );
    }
}

export default App;
