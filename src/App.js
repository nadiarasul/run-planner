import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles/setup.css";
import "./styles/App.css";
import firebase from "./firebase.js";
import { setWardrobe } from "./connect/actions";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Settings from "./Components/Settings";
import About from "./Components/About";
import Wardrobe from "./Components/ManageWardrobe";

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
