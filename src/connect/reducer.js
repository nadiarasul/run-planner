import { combineReducers } from "redux";
import { SET_UNITS, SET_NAME, SET_WARDROBE, SET_WEATHER } from "./types";

const initialState = {
	username: "",
	units: "metric",
	wardrobe: [],
};

const settings = (state = initialState, action) => {
	switch (action.type) {
		case SET_UNITS: {
			return {
				...state,
				units: action.payload,
			};
		}
		case SET_NAME: {
			return {
				...state,
				username: action.payload,
			};
		}
		case SET_WARDROBE: {
			return {
				...state,
				wardrobe: action.payload,
			};
		}
		default:
			return state;
	}
};

const weatherData = {
	showCard: false,
	city: "",
	weather: {},
	main: {},
	range: "",
};

const weather = (state = weatherData, action) => {
	switch (action.type) {
		case SET_WEATHER: {
			return {
				...state,
				showCard: true,
				city: action.city,
				weather: action.weather,
				main: action.main,
				range: action.range,
			};
		}
		default:
			return state;
	}
};

export default combineReducers({ settings, weather });
