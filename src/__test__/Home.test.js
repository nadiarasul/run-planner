import { render, fireEvent, screen } from "./test-utils";
import Home from "../Components/Home";

it("Renders the connected app with initialState", () => {
	const { getByText } = render(<Home />, {
		initialState: {},
	});

	const h1 = getByText("Hello !");
});
