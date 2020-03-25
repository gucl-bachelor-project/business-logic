import axios from "axios";
import React, {Component} from "react";
import ReactJson from 'react-json-view';

class ListData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            resultData: null
        };

        this.onFetchRequest = this.onFetchRequest.bind(this);
    }

    static defaultProps = {
        src: null,
        collapsed: true,
        collapseStringsAfter: 15,
        displayObjectSize: true,
        enableClipboard: false,
        indentWidth: 4,
        displayDataTypes: false,
        iconStyle: "triangle"
    };

    onFetchRequest(event) {
        event.preventDefault();

        this.setState({isLoading: true}, () => {
            let endpoint =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:8000"
                    : window.location.origin;

            axios.get(`${endpoint}/${this.props.endpointResourcePath}`)
                .then(response => {
                    if (response.status === 200)
                        this.setState({
                            resultData: response.data ? response.data : {}
                        });
                })
                .catch(err => {
                    alert(`Failed to fetch from endpoint. Error message: ${err.message}`);
                })
                .finally(() => {
                    this.setState({
                        isLoading: false
                    });
                });
        });
    }

    render() {
        const {
            collapseStringsAfter,
            displayObjectSize,
            enableClipboard,
            theme,
            iconStyle,
            collapsed,
            indentWidth,
            displayDataTypes
        } = this.props;
        const {isLoading, resultData} = this.state;

        let resultDataVisualizer;
        if (resultData !== null)
            resultDataVisualizer = (
                <>
                    <p>Result:</p>
                    <ReactJson
                        name={false}
                        collapsed={collapsed}
                        theme={theme}
                        src={resultData}
                        collapseStringsAfterLength={collapseStringsAfter}
                        displayObjectSize={displayObjectSize}
                        enableClipboard={enableClipboard}
                        indentWidth={indentWidth}
                        displayDataTypes={displayDataTypes}
                        iconStyle={iconStyle}
                    />
                </>
            );

        return (
            <>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <button onClick={this.onFetchRequest} disabled={isLoading}>Get data</button>
                )}
                {resultDataVisualizer}
            </>
        );
    }
}

export default ListData;
