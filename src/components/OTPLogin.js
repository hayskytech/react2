import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb6lPpYoqig8DrlEJH4wXKsrU5p__jWUc",
  authDomain: "app518-aa922.firebaseapp.com",
  databaseURL: "https://app518-aa922-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "app518-aa922",
  storageBucket: "app518-aa922.appspot.com",
  messagingSenderId: "1051906951124",
  appId: "1:1051906951124:web:6bdb3360347617b1c43841",
  measurementId: "G-836G0T6VT3"
};

function OTPLogin() {
	const [phone, setPhone] = useState(918498000172)
	const [otp, setOTP] = useState('')
	const [phoneDiv, showPhone] = useState(true)
	const [otpDiv, showOTP] = useState(false)
	const [captchaDiv, showCaptcha] = useState(true)
	const [myuser, setUser] = useState(null)
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	useEffect(() => {
		const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
			setUser(user);
		});
		return () => {
			unsubscribeAuthState();
			unsubscribeIdToken();
		};
	}, [auth]);

	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				setUser(null);
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
				showCaptcha(false)
				showOTP(true)
				showPhone(false)
				window.confirmationResult = confirmationResult;

			}).catch((error) => {
				console.log(error);
			});
	}
	function handleOTP() {
		const code = otp
		const confirmationResult = window.confirmationResult
		confirmationResult.confirm(code).then((result) => {
			setUser(result.user)
			console.log('sign in success');
			setPhone('')
			setOTP('')
		}).catch((error) => {
			console.log(error);
		});
	}
	function handlePhoneInp(event) {
		setPhone(event.target.value)
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

					{phoneDiv && <div><input type="number" value={phone} onChange={handlePhoneInp} /><button onClick={sendsms}>Send SMS</button></div>}

					{captchaDiv && <div id='recaptcha-container'></div>}

					{otpDiv && <div>
						<input type='text' value={otp} onChange={handleOTPInp} />
						<button onClick={handleOTP}>SUbmit OTP</button>
					</div>}
				</>
			)}

		</>
	);
}

export default OTPLogin;
