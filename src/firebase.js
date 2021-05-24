import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
	apiKey: API_KEY,
	authDomain: "run-planner-6dbb5.firebaseapp.com",
	projectId: "run-planner-6dbb5",
	storageBucket: "run-planner-6dbb5.appspot.com",
	messagingSenderId: "162340731785",
	appId: "1:162340731785:web:7b9d2e4f986ffde0063f58",
};
firebase.initializeApp(config);

// this exports the CONFIGURED version of the firebase object
export default firebase;
