import React, { useRef, useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import { firebaseConfig } from '../Config';
import OTPLogin, { handleLogout } from './OTPLogin';
import {todostyles} from './TodoStyles'



function OnlineTodoList() {
	const inputRef = useRef(null);
	const [list, setList] = useState([])
	const [item, setItem] = useState('')
	const [waitingArea, setArea] = useState("Loading...")

	const [myuser, setUser] = useState(null)
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	useEffect(() => {
		const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
			setUser(user);
			if (user) {
				loadList(user.uid)
			} else {
				setArea(<OTPLogin />)
			}
		});
		const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
			setUser(user);
		});
		return () => {
			unsubscribeAuthState();
			unsubscribeIdToken();
		};
	}, [auth]);

	const db = getDatabase();
	function updateTodoList(thelist) {
		set(ref(db, 'users/' + myuser.uid + "/todo"), thelist);
	}

	function loadList(uid) {
		const db = getDatabase();
		const starCountRef = ref(db, 'users/' + uid + '/todo');
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setList(data)
			} else {
				setList([])
			}
		});
	}


	function addItem() {
		if (item === '') {
			return
		}
		const newList = [...list, item]
		setList(newList)
		updateTodoList(newList)
		setItem('')
		inputRef.current.focus()
	}
	function handleItem(event) {
		setItem(event.target.value)
	}
	function handleKeydown(event) {
		if (event.key === 'Enter') {
			addItem()
		}
	}
	function removeitem(event) {
		const index = Number(event.target.getAttribute('data-index'));
		const newList = [...list];
		newList.splice(index, 1);
		setList(newList);
		updateTodoList(newList)
	}
	function handleLogout() {
		signOut(auth)
			.then(() => {
				setUser(null);
			})
	}
	return (
		<>{myuser ? (
			<>
				<input type="text" value={item} placeholder='write something' autoFocus onChange={handleItem} onKeyDown={handleKeydown} ref={inputRef} />
				<button onClick={addItem}>ADD ITEM</button>
				<button onClick={handleLogout}>Logout</button>
				<div style={todostyles.mainDiv}>
					{list.map((i, index) => (
						<li key={index} style={todostyles.li}>{i} 
						<button style={todostyles.liBtn} onClick={removeitem} data-index={index}>x</button></li>
					))}
				</div>
				
			</>
		) : (
			<>{waitingArea}</>
		)}
		</>
	)
}

export default OnlineTodoList
