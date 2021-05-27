import ItemsList from "./ItemsList";

function Wardrobe(props) {
	return (
		<div className="content">
			<h1>Wardrobe </h1>
			<div>
				<ItemsList items={props.items} />
			</div>
		</div>
	);
}

export default Wardrobe;
