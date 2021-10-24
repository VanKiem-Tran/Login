import React from 'react';

function Login(props: {
	email: any;
	setEmail: any;
	password: any;
	setPassword: any;
	handleLogin: any;
	handleSignUp: any;
	hasAccount: any;
	setHasAccount: any;
	emailError: any;
	passwordError: any;
}) {
	const {
		email,
		setEmail,
		password,
		setPassword,
		handleLogin,
		handleSignUp,
		hasAccount,
		setHasAccount,
		emailError,
		passwordError,
	} = props;
	return (
		<section className="login">
			<div className="loginContainer">
				<label>Username</label>
				<input
					type="text"
					autoFocus
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<p className="error_Msg">{emailError}</p>
				<label>Password</label>
				<input
					type="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<p className="errorMsg">{passwordError}</p>
				<div className="btnContainer">
					{hasAccount ? (
						<>
							<button onClick={handleLogin}>Sign in</button>
							<p>
								Don't have an account ?
								<span
									onClick={() => {
										setHasAccount(!hasAccount);
									}}
								>
									Sign up
								</span>
							</p>
						</>
					) : (
						<>
							<button onClick={handleSignUp}>Sign up</button>
							<p>
								Have an account ?
								<span
									onClick={() => {
										setHasAccount(!hasAccount);
									}}
								>
									Sign in
								</span>
							</p>
						</>
					)}
				</div>
			</div>
		</section>
	);
}

export default Login;
