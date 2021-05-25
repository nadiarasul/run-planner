import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import reducer from "./connect/reducer";

import "./styles/setup.css";
import "./styles/App.css";
import Header from "./Header";
import Home from "./Home";
import Settings from "./Settings";
import About from "./About";
import Wardrobe from "./ManageWardrobe";

// TO DO:
// 1. convert C to F locally rather than new API call
// 2. user accounts

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

function App() {
	const store = createStore(reducer, middleware);

	return (
		<Provider store={store}>
			<Router>
				<Header />
				<main className="layoutContainer">
					<div className="App">
						<Switch>
							<Route
								path="/settings"
								render={() => {
									return <Settings />;
								}}
							/>
							<Route path="/about" component={About} />
							<Route path="/wardrobe" component={Wardrobe} />
							<Route
								path="/"
								render={() => {
									return <Home />;
								}}
							/>
						</Switch>
					</div>
				</main>
			</Router>
		</Provider>
	);
}

export default App;
