import { useSelector, useDispatch } from "react-redux";
import { setUnits, setName } from "./connect/actions";
import styles from "./styles/Settings.module.css";

function Settings(props) {
	const dispatch = useDispatch();
	const units = useSelector((state) => state.settings.units);
	const username = useSelector((state) => state.settings.username);

	return (
		<div className="content">
			<h1>Settings</h1>
			<div>
				<fieldset>
					<legend>Set your units:</legend>
					<div className="form-field-wrap">
						<input
							type="radio"
							name="units"
							id="imperial"
							value="imperial"
							checked={units === "imperial"}
							onChange={(e) => dispatch(setUnits(e.target.value))}
						/>
						<label htmlFor="imperial">F</label>
						<input
							type="radio"
							name="units"
							id="metric"
							value="metric"
							checked={units === "metric"}
							onChange={(e) => dispatch(setUnits(e.target.value))}
						/>
						<label htmlFor="metric">C</label>
					</div>
				</fieldset>
				<div>
					<h2>Profile</h2>
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
			</div>
		</div>
	);
}

export default Settings;
