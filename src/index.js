import { Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'react-redux';
import store from "./store";
import Example from "./routes/example";
import Grid from "./routes/grid";
import Header from "./components/header";
import Footer from "./components/footer";

export default class App extends Component {

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<Provider store={store}>
			<Header/>
			<div class="container">

					<Router onChange={this.handleRoute}>
						<Example path="/" />
						<Grid path="/grid" />
					</Router>

			</div>
			</Provider>
		);
	}
}
