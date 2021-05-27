import { useSelector, useDispatch } from "react-redux";
import { setUnits, setName, getWeatherAction } from "../connect/actions";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Settings(props) {
	const dispatch = useDispatch();
	const units = useSelector((state) => state.settings.units);
	const username = useSelector((state) => state.settings.username);
	const city = useSelector((state) => state.weather.city);

	const handleUnits = (e) => {
		dispatch(setUnits(e.target.value));
		const url = new URL("https://api.openweathermap.org/data/2.5/weather");
		url.search = new URLSearchParams({
			appid: API_KEY,
			q: city,
			units: e.target.value,
		});
		dispatch(getWeatherAction(url));
	};

	return (
		<div className="content">
			<h1>Settings</h1>
			<fieldset>
				<legend>Set your units:</legend>
				<div className="form-field-wrap">
					<input
						type="radio"
						name="units"
						id="imperial"
						value="imperial"
						checked={units === "imperial"}
						onChange={handleUnits}
					/>
					<label htmlFor="imperial">F</label>
					<input
						type="radio"
						name="units"
						id="metric"
						value="metric"
						checked={units === "metric"}
						onChange={handleUnits}
					/>
					<label htmlFor="metric">C</label>
				</div>
			</fieldset>
			<div className="form-field-wrap">
				<label htmlFor="name">First name:</label>
				<input
					type="text"
					id="name"
					autoComplete="fname"
					value={username}
					onChange={(e) => dispatch(setName(e.target.value))}
				/>
			</div>
		</div>
	);
}

export default Settings;
