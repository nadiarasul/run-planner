import { useState } from "react";
import { useSelector } from "react-redux";
import firebase from "./firebase.js";

import styles from "./styles/ItemsList.module.css";

function ItemsList(props) {
	const clothingItems = useSelector((state) => state.settings.wardrobe);
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [weatherType, setWeatherType] = useState("");

	const handleSubmit = (e) => {
		console.log(e.target[0].value);
		e.preventDefault();
		const singleItemRef = firebase.database().ref(`clothes`);
		singleItemRef.push({
			name: name,
			type: type,
			weatherType: weatherType,
			isDirty: false,
		});
	};

	const handleRemove = (e) => {
		e.preventDefault();
		const id = e.target.getAttribute("data-id");
		const singleItemRef = firebase.database().ref(`clothes/${id}`);
		singleItemRef.remove();
	};

	const handleCheckbox = (e) => {
		const id = e.target.getAttribute("data-id");
		const singleItemRef = firebase.database().ref(`clothes/${id}`);
		singleItemRef.update({
			isDirty: e.target.checked,
		});
	};

	const renderItems = (type) => {
		return (
			<ul className={styles.clothingList}>
				{clothingItems
					.filter((item) => item.type === type)
					.map((x, i) => {
						return (
							<li key={i} className={styles.item}>
								<span>
									{x.name} - {x.weatherType}{" "}
								</span>
								<label htmlFor={x.productId}>
									In the wash:
									<input
										type="checkbox"
										name={x.productId}
										id={x.productId}
										data-id={x.productId}
										checked={x.isDirty}
										onChange={handleCheckbox}
									/>
								</label>
								<button
									className={styles.remove}
									onClick={handleRemove}
									data-id={x.productId}>
									Remove
								</button>
							</li>
						);
					})}
			</ul>
		);
	};

	return (
		<div>
			<h2>Add your items</h2>
			<div>
				<form onSubmit={handleSubmit}>
					<div className="form-field-wrap">
						<label htmlFor="user-items">Item name:</label>
						<input
							type="text"
							id="user-items"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							aria-required="true"
						/>
					</div>
					<div className="form-field-wrap">
						<label htmlFor="type">Select a type:</label>
						<select
							name="type"
							id="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
							required
							aria-required="true">
							<option value="">-- Clothing --</option>
							<option value="top">Top</option>
							<option value="bottom">Bottom</option>
							<option value="accessory">Accessory</option>
							<option value="shoes">Shoes</option>
						</select>
					</div>
					<div className="form-field-wrap">
						<label htmlFor="weatherType">Select weather type:</label>
						<select
							name="weatherType"
							id="weatherType"
							value={weatherType}
							onChange={(e) => setWeatherType(e.target.value)}
							required
							aria-required="true">
							<option value="">-- Weather --</option>
							<option value="hot">Hot</option>
							<option value="mild">Mild</option>
							<option value="cold">Cold</option>
						</select>
					</div>
					<div className="form-field-wrap">
						<button type="submit">Save Item</button>
					</div>
				</form>
			</div>
			<div>
				<h2>Your list</h2>
				<h3>Tops</h3>
				{clothingItems && renderItems("top")}
				<h3>Bottoms</h3>
				{clothingItems && renderItems("bottom")}
				<h3>Accessories</h3>
				{clothingItems && renderItems("accessory")}
				<h3>Shoes</h3>
				{clothingItems && renderItems("shoes")}
			</div>
		</div>
	);
}

export default ItemsList;
