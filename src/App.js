import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles/setup.css";
import "./styles/App.css";
import firebase from "./firebase.js";
import { setWardrobe } from "./connect/actions";
import Header from "./Header";
import Home from "./Home";
import Settings from "./Settings";
import About from "./About";
import Wardrobe from "./ManageWardrobe";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const productsRef = firebase.database().ref("clothes");

		productsRef.on("value", (snapshot) => {
			const firebaseData = snapshot.val();

			const productsFromDb = [];
			for (let productId in firebaseData) {
				const { name, type, weatherType, isDirty } = firebaseData[productId];
				productsFromDb.push({ productId, name, type, weatherType, isDirty });
			}

			dispatch(setWardrobe(productsFromDb));
		});
	}, [dispatch]);

	return (
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
	);
}

export default App;
