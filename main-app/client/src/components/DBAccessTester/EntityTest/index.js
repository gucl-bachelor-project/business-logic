import React, {Component} from "react";
import ListData from "../ListData";

class EntityTest extends Component {
    render() {
        return (
            <div className="db-entity-section">
                <h3>{this.props.title}</h3>
                <hr/>
                <h4>List all</h4>
                <ListData endpointResourcePath={this.props.entityResourcePath}/>
                <h4>{this.props.createEntityText}</h4>
                {this.props.createFormComponent}
            </div>
        );
    }
}

export default EntityTest;
