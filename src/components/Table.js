import React from 'react'
import Row from './Row'

function Table(props) {
	
	const tablecss = {
		border: '1px solid black',
		padding: '10px',
		margin: '10px',
		display: "inline-block"
	}
	let rows = [];
	for (let i = 1; i <= 10; i++) {
		rows.push(<Row n={props.n} i={i}/>);
	}
	return (
		<table style={tablecss}>
			<tbody>
				{rows}
			</tbody>
		</table>
	)
}

export default Table
