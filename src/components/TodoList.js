import React, { useRef, useState, useEffect } from 'react'

function TodoList() {
	const inputRef = useRef(null);
	const [list, setList] = useState([])
	const [item, setItem] = useState('')

	useEffect(() => {
		const storedData = localStorage.getItem('myData');
		if (storedData) {
			setList(JSON.parse(storedData));
		}
	}, []);

	function addItem() {
		if (item === '') {
			return
		}
		const newList = [...list, item]
		setList(newList)
		localStorage.setItem('myData', JSON.stringify(newList));
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
		const updatedList = [...list];
		updatedList.splice(index, 1);
		setList(updatedList);
		localStorage.setItem('myData', JSON.stringify(updatedList))
	}
	return (
		<>
			<input type="text" value={item} placeholder='write something' autoFocus onChange={handleItem} onKeyDown={handleKeydown} ref={inputRef} />
			<button onClick={addItem}>ADD ITEM</button>

			{list.map((i, index) => (
				<li key={index}>{i} <button onClick={removeitem} data-index={index}>x</button></li>
			))}
		</>
	)
}

export default TodoList
