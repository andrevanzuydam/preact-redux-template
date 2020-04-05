import { Component } from "preact";
import { connect } from "react-redux";
import style from "../css/style.css";
import globalStore from "../../store";

const mapStateToProps = state => {
    return { userSession: state.userSession };
};

class ProfileComponent extends Component {
    state = {userSession: {username: 'TEST', email: 'Test'}};

    constructor(store, props) {
        super(props);
        //Subscribe an event to listen for changes in the global state
        globalStore.subscribe(() => {
            this.refreshComponent (globalStore.getState());
        });
    }

    componentDidMount() {
        this.setState(globalStore.getState());
    }

    refreshComponent = state => this.setState(state);

    render() {
        const { userSession } = this.state;
        return  (
            <table class={style.table}>
                <tr>
                    <td>Username</td>
                    <td>{userSession.username}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{userSession.email}</td>
                </tr>
            </table>
        )
    }
}

const Profile = connect(mapStateToProps)(ProfileComponent);

export default Profile;