import React, {Component} from "react";
import {createEntity} from "../utils/api-call";

class ConfigCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = ConfigCreateForm.defaultState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static defaultState = {
        name: "",
        enabled: false
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'enabled' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        createEntity(this.props.endpointResourcePath, {
            name: this.state.name,
            enabled: this.state.enabled
        }).then(response => {
            this.setState({
                ...ConfigCreateForm.defaultState,
                resultText: `Created config with ID: ${response.data.id}`
            });
        }).catch(errMsg => {
            this.setState({
                resultText: errMsg
            });
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:
                        <input name="name" type="text" value={this.state.name}
                               onChange={this.handleInputChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Enable:
                        <input name="enabled" type="checkbox" checked={this.state.enabled}
                               onChange={this.handleInputChange}/>
                    </label>
                </div>
                <input className="form-submit-btn" type="submit" value="Submit"/>
                {
                    this.state.resultText ?
                        <>
                            <p>Response:</p>
                            <p>{this.state.resultText}</p>
                        </> : null
                }

            </form>
        );
    }
}

export default ConfigCreateForm;
