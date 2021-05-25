import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reducer from "./connect/reducer";

import "./styles/setup.css";
import "./styles/App.css";
import Header from "./Header";
import axios from "axios";
import Home from "./Home";
import Settings from "./Settings";
import About from "./About";
import Wardrobe from "./ManageWardrobe";

// TO DO:
// 1. convert C to F locally rather than new API call
// 2. user accounts

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
	const [city, setCity] = useState("");
	const [currentCity, setCurrentCity] = useState("");
	const [temperature, setTemperature] = useState("");
	const [weather, setWeather] = useState([]);
	const [showWeatherCard, setShowWeatherCard] = useState(false);
	const [queryCity, setQueryCity] = useState("");
	const [error, setError] = useState("");
	const [units, setUnits] = useState("metric");
	const [name, setName] = useState("");
	const [items, setItems] = useState([]);
	const [mainWeather, setMainWeather] = useState({});
	const [weatherRange, setWeatherRange] = useState("");

	const handleUnits = (e) => {
		console.log(e.target);
		setUnits(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setQueryCity(city);
	};

	const handleChange = (e) => {
		const userInput = e.target.value;
		setCity(userInput);
	};

	const handleName = (e) => {
		const userInput = e.target.value;
		setName(userInput);
	};

	const getLocation = () => {
		if (!navigator.geolocation) {
			console.log("Geolocation is not supported by your browser");
		} else {
			navigator.geolocation.getCurrentPosition(success);
		}
	};

	const success = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		getWeatherFromLocation(latitude, longitude);
	};

	const getWeatherFromLocation = (latitude, longitude) => {
		const url = new URL("https://api.openweathermap.org/data/2.5/weather");
		url.search = new URLSearchParams({
			appid: API_KEY,
			lat: latitude,
			lon: longitude,
			units: units,
		});
		axios.get(url).then((response) => {
			console.log(response);
			const data = response.data;
			// const json = data.json();
			setWeather(data.weather[0]);
			setMainWeather(data.main);
			setShowWeatherCard(true);
			setCurrentCity(data.name);
			const temp = getWeatherRange(data.main.feels_like);
			setWeatherRange(temp);
		});
	};

	const getWeatherRange = (temperature) => {
		if (temperature < 0) {
			return "cold";
		}
		if (temperature >= 0 && temperature <= 10) {
			return "mild";
		}
		if (temperature > 10) {
			return "hot";
		}
	};

	const getWeather = () => {
		const url = new URL("https://api.openweathermap.org/data/2.5/weather");
		url.search = new URLSearchParams({
			appid: API_KEY,
			q: city,
			units: units,
		});
		axios.get(url).then((response) => {
			console.log(response.data);
			const data = response.data;
			// const json = data.json();
			setWeather(data.weather[0]);
			setMainWeather(data.main);
			setShowWeatherCard(true);
			const temp = getWeatherRange(data.main.feels_like);
			setWeatherRange(temp);
		});
	};

	useEffect(() => {
		if (queryCity) {
			getWeather();
		}
	}, [queryCity]);
	return (
		<>
			<Router>
				<Header />
				<main className="layoutContainer">
					<div className="App">
						<Switch>
							<Route
								path="/settings"
								render={() => {
									return (
										<Settings
											handleUnits={handleUnits}
											units={units}
											handleName={handleName}
											name={name}
										/>
									);
								}}
							/>
							<Route path="/about" component={About} />
							<Route path="/wardrobe" component={Wardrobe} />
							<Route
								path="/"
								render={() => {
									return (
										<Home
											handleChange={handleChange}
											handleSubmit={handleSubmit}
											getLocation={getLocation}
											currentCity={currentCity}
											items={items}
											name={name}
											weather={weather}
											main={mainWeather}
											showWeatherCard={showWeatherCard}
											units={units}
											weatherRange={weatherRange}
										/>
									);
								}}
							/>
						</Switch>
					</div>
				</main>
			</Router>
		</>
	);
}

export default App;
