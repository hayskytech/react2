import React from 'react'
function AllTables() {
	const styles = {
		tables: {
			display: 'flex',
			gap: '10px',
			padding: '10px 0',
			flexWrap: 'wrap'
		},
		table: {
			border: '1px solid black',
			padding: '5px',
		}
	}
	const [x, setx] = React.useState(10);
	const [y, sety] = React.useState(10);
	function handlex(event) {
		const v = event.target.value
		setx(parseInt(v ? v : 0))
	}
	function handley(event) {
		const v = event.target.value
		sety(parseInt(v ? v : 0))
	}
	let alltables = []
	for (let a = 1; a <= x; a++) {

		let table = []
		for (let b = 1; b <= y; b++) {
			table.push(	<tr key={b}><td>{a} x {b} = {a * b}</td></tr>	)
		}
		alltables.push(<table key={a} style={styles.table}>
			<thead>{table}
			</thead>
			</table>
			)
	}

	return (
		<div>
			Tables: <input type="number" value={x} onChange={handlex} />
			<br /><br />
			Rows: <input type="number" value={y} onChange={handley} />
			<br />
			<div style={styles.tables}>
				{alltables}
			</div>
		</div>
	)
}
export default AllTables