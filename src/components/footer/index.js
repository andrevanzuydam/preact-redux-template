import {Component} from "preact";
import style from "./style.css";

class Footer extends Component {
    render() {
        //add inbuilt class to bootstrap class
        const classNames = `${style.footer} bg-dark`;
        return (
            <>
                <footer class={classNames}>
                    <div class="container row">
                        <div class="col-md-12">
                            <p class="text-muted">Footer</p>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
};

export default Footer;