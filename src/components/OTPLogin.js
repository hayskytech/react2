import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyBVDHEGhWyTSlInM1j8amla1EPq8356BX4",
	authDomain: "muslimawaaz-432c1.firebaseapp.com",
	databaseURL: "https://muslimawaaz-432c1.firebaseio.com",
	projectId: "muslimawaaz-432c1",
	storageBucket: "muslimawaaz-432c1.appspot.com",
	messagingSenderId: "642204247107",
	appId: "1:642204247107:web:4a2bde5529880182fbe0f6",
	measurementId: "G-6T47JPB0TE"
};
// must be listed before other Firebase SDKs

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");



function OTPLogin() {
	const [phone, setPhone] = useState(918498000172)
	const [otp, setOTP] = useState('')
	const [phshow, showPh] = useState(true)
	const [otpshow, showOTP] = useState(false)
	const [capdiv, setcapdiv] = useState(true)
	const [myuser, setUser] = useState(null)
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		return () => unsubscribe();
	}, []);

	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				setUser(null); // Update the user state to indicate the user is logged out
			})
			.catch((error) => {
				console.log('Logout error:', error);
			});
	};


	function sendsms() {
		const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
		console.log('recaptcha started');
		window.recaptchaVerifier = recaptchaVerifier
		const phoneNumber = '+' + phone;
		const appVerifier = window.recaptchaVerifier;
		signInWithPhoneNumber(auth, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				console.log('sms sent');
				setcapdiv(false)
				showOTP(true)
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;

			}).catch((error) => {
				console.log(error);
			});
	}
	function handleOTP() {
		const code = otp
		const confirmationResult = window.confirmationResult
		confirmationResult.confirm(code).then((result) => {
			const user = result.user;
			setUser(result.user)
			console.log('sign in success');
			setPhone('')
			setOTP('')
		}).catch((error) => {
			console.log(error);
		});
	}
	function handlePhoneInp(event) {
		const phone = (event.target.value)
		setPhone(phone ? parseInt(phone) : '')
	}
	function handleOTPInp(event) {
		setOTP(event.target.value)
	}


	return (
		<>
			{myuser ? (
				<>
					<p>User is logged in: {myuser.phoneNumber}</p>
					<button onClick={handleLogout}>Logout</button>
				</>
			) : (
				<>
					<p>User is not logged in</p>

					{phshow && <input type="number" value={phone} onChange={handlePhoneInp} />}
					<br />
					<button onClick={sendsms}>Send SMS</button>
					{capdiv && <div id='recaptcha-container'></div>}

					{otpshow &&
						<>
							<input type='text' value={otp} onChange={handleOTPInp} />
							<br />
							<button onClick={handleOTP}>SUbmit OTP</button>
						</>}


				</>
			)}


		</>
	);
}

export default OTPLogin;
