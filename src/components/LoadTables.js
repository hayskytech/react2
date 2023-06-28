import React from 'react'
import Table from './Table';


function LoadTables() {
	let tables = [];
	for (let n = 1; n <= 10; n++) {
		tables.push(<Table n={n}/>);
	}
	return tables;
}

export default LoadTables
