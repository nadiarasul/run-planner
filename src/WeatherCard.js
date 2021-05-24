import { useSelector } from "react-redux";
import styles from "./styles/WeatherCard.module.css";

function WeatherCard(props) {
	const weatherData = useSelector((state) => state.weather);
	const units = useSelector((state) => state.settings.units);
	const city = useSelector((state) => state.weather.city);

	return (
		<div className={styles.weatherCard}>
			<h2>Your Weather in {city}</h2>
			<div className={styles.details}>
				<div>
					<p>
						Temperature: {weatherData.main.temp}&deg;
						{units === "metric" ? "C" : "F"}
					</p>
					<p>
						Feels like: {weatherData.main.feels_like}&deg;
						{units === "metric" ? "C" : "F"}
					</p>
				</div>
				<img
					src={`http://openweathermap.org/img/w/${weatherData.weather.icon}.png`}
					alt={weatherData.weather.description}
				/>
			</div>
		</div>
	);
}

export default WeatherCard;
