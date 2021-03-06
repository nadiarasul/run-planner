import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherAction } from "../connect/actions";
import WeatherCard from "./WeatherCard";
import WardrobeCard from "./WardrobeCard";
import styles from "../styles/Home.module.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Home(props) {
	const dispatch = useDispatch();
	const units = useSelector((state) => state.settings.units);
	const username = useSelector((state) => state.settings.username);
	const showCard = useSelector((state) => state.weather.showCard);
	const range = useSelector((state) => state.weather.range);

	const [queryCity, setQueryCity] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = new URL("https://api.openweathermap.org/data/2.5/weather");
		url.search = new URLSearchParams({
			appid: API_KEY,
			q: queryCity,
			units: units,
		});
		dispatch(getWeatherAction(url, units));
		setQueryCity("");
	};

	const handleChange = (e) => {
		const userInput = e.target.value;
		setQueryCity(userInput);
	};

	return (
		<div className={`content ${range}`}>
			<div className={styles.homeHeader}>
				<h1>Hello {username}!</h1>
			</div>
			<div className={styles.homeLayout}>
				<div className={styles.columnLeft}>
					<div className={styles.weatherForm}>
						<form onSubmit={handleSubmit} className={styles.weatherForm}>
							<div className="form-field-wrap">
								<label htmlFor="city">Enter your city: </label>
								<input
									type="text"
									id="city"
									value={queryCity}
									onChange={handleChange}
								/>
							</div>
							<div className="form-field-wrap">
								<input type="submit" value="Submit" />
							</div>
						</form>
					</div>
					{showCard && <WeatherCard />}
				</div>
				{showCard && <WardrobeCard />}
			</div>
		</div>
	);
}

export default Home;
