import { Component } from "preact";

class BSInput extends Component {
    state = { type: 'text', placeHolder: 'Some Text', label: 'test Label', name : 'testName', value: 'testValue' };
    constructor(props) {
        super(props);
    }

    render() {
        const { type, placeHolder, label, name, value } = this.props;
        return (
            <div class="form-group">
                <label for="{name}" >{label}</label>
                <input class="form-control" id={name} name={name} type={type} placeholder={placeHolder} value={value} onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default BSInput;