import {Component} from "preact";
import {Link} from "preact-router";
class Header extends Component {
    render() {
        return (
            <nav class="nav bg-dark">
                <Link class="nav-link" activeClassName="active" href="/">Home</Link>
                <Link class="nav-link" activeClassName="active" href="/grid">Grid</Link>
            </nav>
        );
    }
};

export default Header;