function Register() {
	return (
		<div>
			<form>
				<label htmlFor="email">Email</label>
				<input type="text" name="email" id="email" />
				<label htmlFor="password">Password</label>
				<input type="text" name="password" id="password" />
			</form>
		</div>
	);
}

export default Register;
