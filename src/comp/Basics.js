import React from 'react'


export default function Basics() {

	const x = 2
	const y = 3

	const z = x + y
	const age = 20
	let msg = ''

	if (age >= 18) {
		msg = 'voting'
	} else {
		msg = 'not voting'
	}



	return (
		<div style={{ backgroundColor: 'pink' }}>
			<h1>{msg}</h1>

			<h2>{z}</h2>

			<h3>{x}  {y}</h3>
			<h3>{x + y}</h3>
			<hr />
			<br />

			<p style={{
				color: 'red',
				backgroundColor: 'skyblue',
				padding: 20,
				fontSize: 25,
			}}>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi corrupti reiciendis, atque placeat rem non obcaecati, assumenda explicabo corporis tempora voluptate cumque earum alias! In asperiores illo sapiente a culpa!
			</p>


		</div>
	)
}
