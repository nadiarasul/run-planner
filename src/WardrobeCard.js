import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles/WardrobeCard.module.css";

function WardrobeCard(props) {
	const clothingItems = useSelector((state) => state.settings.wardrobe);
	const range = useSelector((state) => state.weather.range);
	const [currentClothes, setCurrentClothes] = useState([]);

	const renderItems = (type) => {
		return (
			<ul className={styles.clothingList}>
				{currentClothes
					.filter((item) => item.type === type)
					.filter((item) => !item.isDirty)
					.map((item, index) => {
						return (
							<li key={index} className={styles.item}>
								<span>
									{item.name} - {item.weatherType}{" "}
								</span>
							</li>
						);
					})}
			</ul>
		);
	};

	useEffect(() => {
		const filterItems = (range) => {
			const newClothesArray = clothingItems.filter(
				(item) => item.weatherType === range
			);
			setCurrentClothes(newClothesArray);
		};

		if (clothingItems) {
			filterItems(range);
		}
	}, [clothingItems, range]);

	return (
		<div className={styles.columnRight}>
			<h2>Here's what you could wear:</h2>
			<h3>Tops</h3>
			{currentClothes && renderItems("top")}
			<h3>Bottoms</h3>
			{currentClothes && renderItems("bottom")}
			<h3>Accessories</h3>
			{currentClothes && renderItems("accessory")}
			<h3>Shoes</h3>
			{currentClothes && renderItems("shoes")}
		</div>
	);
}

export default WardrobeCard;
