import { Component } from 'preact';
import BSInput from '../../components/bs-input';
import QRCode from 'qrcode.react';


class Example extends Component {
    state = {qrName: '', qrResult: ''};


    handleInput = event => {
        console.log (event.target.value);
        this.setState({qrName: event.target.value});
    }

    render() {

        return (
            <>
                <h1>Example QR Code Gen Reader</h1>
                <QRCode value={this.state.qrName} />
                <BSInput name="inputText" onChange={this.handleInput} />
                <p>{this.state.qrResult}</p>
            </>
        );
    }
};

export default Example;