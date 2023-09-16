import React from 'react'

export default function Student(p) {
  return (
    <div style={{ borderColor: 'black', borderWidth: 2, borderStyle: 'solid', padding: 10, margin: 10 }}>
      <h3>{p.item.title.rendered}</h3>
      <p>{p.item.acf.phone}</p>
      <p>
        {p.item.acf.date_of_birth.slice(0, 4)}-{p.item.acf.date_of_birth.slice(4, 6)}-{p.item.acf.date_of_birth.slice(6, 8)}
      </p>
    </div>
  )
}
