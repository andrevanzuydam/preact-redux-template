import { Component } from "preact";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/index";
import BSInput from "../bs-input";

function mapDispatchToProps(dispatch) {
    return {
        updateProfile: userProfile => dispatch(updateProfile(userProfile))
    };
}

class LoginForm extends Component {
    state = { username: '', password: '' };
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // /this.setState(globalStore.getState());
    }

    /**
     * Updates the state of any input, must have an id
     * @param event
     */
    handleChange(event) {
        this.setState( {[event.target.id]: event.target.value} );
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log (this.state);
        const { email, username } = this.state;
        this.props.updateProfile({ email, username});
    }

    render() {
        const { email, username } = this.state;
        return (
            <div class="card">

                <div class="card-body">
                    <h5 class="card-title">Login</h5>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <BSInput type="text" label="Username" name="username" value={username} onChange={this.handleChange}/>
                        <BSInput type="password" label="Password" name="password" onChange={this.handleChange}/>
                    </div>
                    <button class="btn btn-primary" type="submit">Submit</button>
                </form>
                </div>
            </div>

        );
    }
}

const Login = connect(
    null,
    mapDispatchToProps
)(LoginForm);

export default Login;