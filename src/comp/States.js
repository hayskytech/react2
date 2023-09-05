import React, { useState } from 'react'

export default function States() {
  const [x, setx] = useState(23)
  const [y, sety] = useState(25)

  function handlex(e) {
    setx(e.target.value)
  }
  function handley(e) {
    sety(e.target.value)
  }

  return (
    <div>
      <input type="number" value={x} onChange={handlex} />
      <input type="number" value={y} onChange={handley} />
      <br /> Addition: {x + y}
      <br /> Sub: {x - y}
      <br /> Mul: {x * y}
      <br /> Division: {x / y}
    </div>
  )
}
