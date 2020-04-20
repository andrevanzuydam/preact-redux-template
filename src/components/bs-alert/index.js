import { Component } from "preact";

class BSAlert extends Component {
    state = { type: 'info', message: null};
    constructor(props) {
        super(props);
    }

    render() {
        const { type, message} = this.props
        const alertClass = `alert alert-${type}`;
        if ( message) {
            return (
                <div class={alertClass}>
                    <strong>{type.toUpperCase()}</strong> {message}
                </div>
            );
        } else {
            return (<></>);
        }
    }
}

export default BSAlert;