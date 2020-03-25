import React, {Component} from "react";
import {createEntity} from "../utils/api-call";

class DocumentCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = DocumentCreateForm.defaultState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static defaultState = {
        title: "",
        content: "",
        pubDate: new Date().toISOString(),
        authorUserId: 0
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
            title: this.state.title,
            content: this.state.content,
            pub_date: this.state.pubDate,
            author_user_id: this.state.authorUserId
        }).then(response => {
            this.setState({
                ...DocumentCreateForm.defaultState,
                resultText: `Created document with ID: ${response.data.id}`
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
                        Title:
                        <input name="title" type="text" value={this.state.title}
                               onChange={this.handleInputChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Content:
                        <textarea name="content" value={this.state.content}
                                  onChange={this.handleInputChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Publish date:
                        <input name="pubDate" type="text" value={this.state.pubDate} disabled
                               onChange={this.handleInputChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Author user ID:
                        <input name="authorUserId" type="number" value={this.state.authorUserId}
                               onChange={this.handleInputChange}/>
                    </label>
                </div>
                <input className="form-submit-btn" type="submit" value="Submit"/>
                <p>{this.state.resultText}</p>
            </form>
        );
    }
}

export default DocumentCreateForm;
