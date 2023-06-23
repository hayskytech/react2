import React from 'react'

function Student(props) {
	const student = {
		border: '1px solid black', 
		padding: '10px', 
		margin: '10px', 
		display: "inline-block" 
	}
	return (
		<div style={student}>
			<h2>{props.name}</h2>
			<h3>Town: {props.town}</h3>
			<h3>Phone: {props.phone}</h3>
		</div>
	)
}

export default Student
