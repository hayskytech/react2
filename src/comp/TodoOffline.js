import React, { useState } from 'react'

export default function TodoOffline() {
  let data = []
  if (localStorage.getItem('todo')) {
    data = JSON.parse(localStorage.getItem('todo'))
  }

  const [list, setlist] = useState(data)
  const [inp, setinp] = useState('')

  function additem(e) {
    e.preventDefault()
    const newlist = [...list]
    newlist.push(inp)
    setlist(newlist)
    localStorage.setItem('todo', JSON.stringify(newlist))
    setinp('')
  }
  function removeall() {
    setlist([])
    localStorage.setItem('todo', JSON.stringify([]))
  }

  return (
    <div>
      <form onSubmit={additem}>
        <input type="text" value={inp} onChange={(e) => { setinp(e.target.value) }} />
        <button>ADD</button>
      </form>

      <button onClick={removeall}>Remove All</button>
      <hr />

      {
        list.map((item, index) => {
          return (<p>{index + 1} - {item}</p>)
        })
      }

    </div>
  )
}