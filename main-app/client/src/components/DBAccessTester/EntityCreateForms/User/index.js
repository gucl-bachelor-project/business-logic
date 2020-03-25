import React, {Component} from "react";
import {createEntity} from '../utils/api-call';

class UserCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = UserCreateForm.defaultState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static defaultState = {
        firstName: "",
        lastName: "",
        gender: "male",
        resultText: null
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        createEntity(this.props.endpointResourcePath, {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            gender: this.state.gender
        }).then(response => {
            this.setState({...UserCreateForm.defaultState, resultText: `Created user with ID: ${response.data.id}`});
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
                        First name:
                        <input name="firstName" type="text" value={this.state.firstName}
                               onChange={this.handleInputChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Last name:
                        <input name="lastName" type="text" value={this.state.lastName}
                               onChange={this.handleInputChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Gender:
                        <br/>
                        <select name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
                <input className="form-submit-btn" type="submit" value="Submit"/>
                <p>{this.state.resultText}</p>
            </form>
        );
    }
}

export default UserCreateForm;
