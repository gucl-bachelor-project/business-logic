import React from "react";
import ListData from "./ListData";
import UserCreateForm from "./ResourceCreateForms/User";
import DocumentCreateForm from "./ResourceCreateForms/Document";
import ConfigCreateForm from "./ResourceCreateForms/Config";
import "./style.css";

/**
 * Component to load and create data for a specific resource (i.e. user, document or config).
 */
function ResourceGroup(props) {
    return (
        <>
            <p><strong>{props.name}</strong></p>
            <hr/>
            <ListData resourcePath={props.resourcePath}/>
            <hr/>
            {props.resourceCreateFormComponent}
        </>
    );
}

/**
 * Component to create and load data from database.
 */
function DBTester(props) {
    const usersResourceEndpoint = `${props.baseEndpointResourcePath}/users`;
    const documentsResourceEndpoint = `${props.baseEndpointResourcePath}/documents`;
    const configResourceEndpoint = `${props.baseEndpointResourcePath}/configs`;

    return (
        <>
            <div className="d-flex justify-content-start forms">
                <div className="p-2">
                    <ResourceGroup name="Users" resourcePath={usersResourceEndpoint}
                                   resourceCreateFormComponent={
                                       (<UserCreateForm resourcePath={usersResourceEndpoint}/>)
                                   }
                    />
                </div>
                <div className="p-2">
                    <ResourceGroup name="Documents" resourcePath={documentsResourceEndpoint}
                                   resourceCreateFormComponent={
                                       (<DocumentCreateForm resourcePath={documentsResourceEndpoint}/>)
                                   }
                    />
                </div>
                <div className="p-2">
                    <ResourceGroup name="Configs" resourcePath={configResourceEndpoint}
                                   resourceCreateFormComponent={
                                       (<ConfigCreateForm resourcePath={configResourceEndpoint}/>)
                                   }
                    />
                </div>
            </div>
        </>
    );
}

export default DBTester;
