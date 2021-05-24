import axios from "axios";
import { SET_UNITS, SET_NAME, SET_WARDROBE, SET_WEATHER } from "./types";

export const setUnits = (units) => {
	return {
		type: SET_UNITS,
		payload: units,
	};
};

export const setName = (username) => {
	return {
		type: SET_NAME,
		payload: username,
	};
};

export const setWardrobe = (data) => {
	return {
		type: SET_WARDROBE,
		payload: data,
	};
};

export const weatherSuccess = (data, temp) => {
	return {
		type: SET_WEATHER,
		city: data.name,
		weather: data.weather[0],
		main: data.main,
		range: temp,
	};
};

export const getWeatherAction = (url) => {
	return async function (dispatch) {
		try {
			const res = await axios.get(url);
			const data = await res.data;

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

			const temp = getWeatherRange(data.main.feels_like);

			dispatch(weatherSuccess(data, temp));
		} catch (error) {
			console.log(error);
		}
	};
};
