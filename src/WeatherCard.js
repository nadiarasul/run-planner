import { useSelector } from "react-redux";
import styles from "./styles/WeatherCard.module.css";
import flipflops from "./images/icon-flipflops.svg";
import hoodie from "./images/icon-hoodie.svg";
import hat from "./images/icon-hat.svg";

function WeatherCard(props) {
	const weatherData = useSelector((state) => state.weather);
	const units = useSelector((state) => state.settings.units);
	const city = useSelector((state) => state.weather.city);
	const range = useSelector((state) => state.weather.range);

	const showClothingIcon = (weather) => {
		switch (weather) {
			case "hot":
				return <img src={flipflops} alt="flip flops" />;
			case "mild":
				return <img src={hoodie} alt="hoodie" />;
			case "cold":
				return <img src={hat} alt="wool hat" />;
			default:
				return;
		}
	};

	return (
		<div className={styles.weatherCard}>
			<h2>Your Weather in {city}</h2>
			<div className={styles.details}>
				<img
					src={`http://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`}
					alt={weatherData.weather.description}
				/>
				<div>
					<p>
						Temperature: {weatherData.main.temp}&deg;
						{units === "metric" ? "C" : "F"}. Feels like:{" "}
						{weatherData.main.feels_like}&deg;
						{units === "metric" ? "C" : "F"}
					</p>
				</div>
			</div>
			<h2>Looks like it's {range}</h2>
			<div className={styles.weatherIcon}> {showClothingIcon(range)}</div>
		</div>
	);
}

export default WeatherCard;
