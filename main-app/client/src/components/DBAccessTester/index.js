import React, {Component} from "react";
import EntityTest from "./EntityTest";
import UserCreateForm from "./EntityCreateForms/User";
import DocumentCreateForm from "./EntityCreateForms/Document";
import ConfigCreateForm from "./EntityCreateForms/Config";
import "./style.css";

class DBAccessTester extends Component {
    render() {
        const userCreateForm = (
            <UserCreateForm endpointResourcePath={`${this.props.baseEndpointResourcePath}/users`}/>
        );
        const documentCreateForm = (
            <DocumentCreateForm endpointResourcePath={`${this.props.baseEndpointResourcePath}/documents`}/>
        );
        const configCreateForm = (
            <ConfigCreateForm endpointResourcePath={`${this.props.baseEndpointResourcePath}/configs`}/>
        );

        return (
            <div className="db-entities-container">
                <EntityTest title="Users" createEntityText="Create documents"
                            entityResourcePath={`${this.props.baseEndpointResourcePath}/users`}
                            createFormComponent={userCreateForm}/>
                <EntityTest title="Documents" createEntityText="Create documents"
                            entityResourcePath={`${this.props.baseEndpointResourcePath}/documents`}
                            createFormComponent={documentCreateForm}/>
                <EntityTest title="Configs" createEntityText="Create configs"
                            entityResourcePath={`${this.props.baseEndpointResourcePath}/configs`}
                            createFormComponent={configCreateForm}/>
            </div>
        );
    }
}

export default DBAccessTester;
