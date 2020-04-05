import { Component } from 'preact';
import Profile from "../../components/profile";
import Login from "../../components/login";


class Example extends Component {
    render() {
        return (
            <>
                <h1>Example Redux Preact Components</h1>
                <Profile/>
                <Login/>
            </>
        );
    }
};

export default Example;