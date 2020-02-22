import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
	const loginInitial = {
		username: "",
		password: "",
	};

	const [login, setLogin] = useState(loginInitial);

	const handleChange = e => {
		setLogin({ ...login, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.post("/login", login)
			.then(res => {
				localStorage.setItem("token", res.data.payload);
				setLogin(login);
				props.history.push("/bubbles-page");
			})
			.catch(err => {
				localStorage.removeItem("token");
				console.log("You could not login", err);
			}, []);
	};

	return (
		<section className="login">
			<form className="forms" onSubmit={onSubmit}>
				<input
					className="input"
					type="text"
					name="username"
					placeholder="Username"
					value={login.username}
					onChange={handleChange}
				/>
				<input
					className="input"
					type="password"
					name="password"
					placeholder="Password"
					value={login.password}
					onChange={handleChange}
				/>
				<button>Login</button>
				<button onClick={() => localStorage.removeItem("token")}>Log Out</button>
			</form>
		</section>
	);
};

export default Login;
