import React, { useEffect, useState } from 'react';
import { signOut, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { auth } from './firebase';


function OTPLogin(p) {
  const [phone, setPhone] = useState(918498000172)
  const [otp, setOTP] = useState('')
  const [phoneDiv, showPhone] = useState(true)
  const [otpDiv, showOTP] = useState(false)
  const [captchaDiv, showCaptcha] = useState(true)
  const [myuser, setuser] = useState(null)

  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      setuser(user);
      p.setuser(user);

    });
    const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
      setuser(user);
      p.setuser(user);
    });
    return () => {
      unsubscribeAuthState();
      unsubscribeIdToken();
    };
  }, [auth]);

  const handleLogout = () => {

    signOut(auth)
      .then(() => {
        setuser(null);
        p.setuser(null);
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };


  function sendsms() {
    console.log('recaptcha started');
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
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
    confirmationResult.confirm(code)
      .then((result) => {
        setuser(result.user)
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
          {/* <p>User is logged in: {myuser.phoneNumber}</p>
          <button onClick={handleLogout}>Logout</button> */}
        </>
      ) : (
        <>
          <p>User is not logged in</p>

          {phoneDiv && <div>
            <input type="number" value={phone} onChange={handlePhoneInp} />
            <button onClick={sendsms}>Send SMS</button>
          </div>}

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
