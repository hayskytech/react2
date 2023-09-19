import React from 'react'
import { Button, List } from 'semantic-ui-react'

export default function Student(p) {
  return (
    <List.Item style={{ borderColor: 'black', borderWidth: 2, borderStyle: 'solid', padding: 10, margin: 10 }}>

      <List.Content floated='right'>
        <Button onClick={() => { p.setbox(true) }}>Edit</Button>
      </List.Content>

      <List.Content>
        <h3>{p.item.title.rendered}</h3>
        <p>{p.item.acf.phone}</p>
        <p>
          {p.item.acf.date_of_birth.slice(0, 4)}-{p.item.acf.date_of_birth.slice(4, 6)}-{p.item.acf.date_of_birth.slice(6, 8)}
        </p>
      </List.Content>

    </List.Item>
  )
}
