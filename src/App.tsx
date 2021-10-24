import React, { useEffect, useState } from 'react';
import './App.css';
import app from './firebase';
import Login from './Login';
import Hero from './Hero';

function App() {
	const [user, setUser] = useState<string | null>('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [hasAccount, setHasAccount] = useState(false);
	const clearInputs = () => {
		setEmail('');
		setPassword('');
	};
	const clearErrors = () => {
		setEmailError('');
		setPasswordError('');
	};
	const handleLogin = () => {
		clearErrors();
		app
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch((err) => {
				switch (err.code) {
					case 'auth/invalid-email':
					case 'auth/user-disabled':
					case 'auth/user-not-found':
						setEmailError(err.message);
						break;
					case 'auth/wrong-password':
						setPasswordError(err.mesage);
						break;
				}
			});
	};
	const handleSignUp = () => {
		clearErrors();
		app
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch((err) => {
				switch (err.code) {
					case 'auth/email-already-in-use':
					case 'auth/invalid-email':
						setEmailError(err.message);
						break;
					case 'auth/weak-password':
						setPasswordError(err.mesage);
						break;
				}
			});
	};
	const handleLogout = () => {
		app.auth().signOut();
	};
	const authListener = () => {
		app.auth().onAuthStateChanged((user: any) => {
			if (user) {
				clearInputs();
				setUser(user);
			} else {
				setUser('');
			}
		});
	};
	useEffect(() => {
		authListener();
	});
	return (
		<div className="App">
			{user ? (
				<Hero handleLogout={handleLogout} />
			) : (
				<Login
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					handleLogin={handleLogin}
					handleSignUp={handleSignUp}
					hasAccount={hasAccount}
					setHasAccount={setHasAccount}
					emailError={emailError}
					passwordError={passwordError}
				/>
			)}
		</div>
	);
}

export default App;
