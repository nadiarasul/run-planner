function About(props) {
	console.log(props);
	return (
		<div className="content">
			<h1>About this app</h1>
			<p>
				This is an app for planning your running outfit based on the weather.
				The icons are from{" "}
				<a
					href="https://thenounproject.com/"
					target="_blank"
					rel="noopener noreferrer">
					The Noun Project
				</a>
				. Special thanks to{" "}
				<a
					href="https://www.momentist.com/"
					target="_blank"
					rel="noopener noreferrer">
					Garry Waller
				</a>{" "}
				for design.
			</p>
		</div>
	);
}

export default About;
