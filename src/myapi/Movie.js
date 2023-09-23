import React, { useEffect, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

export default function Movie() {
  const [movie, setmovie] = useState('')
  const [list, setlist] = useState([])
  const [refresh, setrefresh] = useState(false)
  const url = 'https://telugudunia-in.stackstaging.com/wp-json/wp/v2/movie'
  function addmovie() {
    if (movie === '') {
      return
    }
    const reqoptions = {
      "method": "POST",
      "headers": {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      "body": JSON.stringify({ title: movie, status: 'publish' })
    }
    fetch(url, reqoptions)
      .then(res => res.json())
      .then(json => {
        setmovie('')
        console.log('movie inserted...');
        setrefresh(!refresh)
      })
  }
  useEffect(() => {
    console.log('starting...');
    fetch(url + '?_fields=id,title')
      .then(res => res.json())
      .then(json => {
        console.log('done');
        setlist(json)
      })
  }, [refresh])

  return (
    <div>
      <Form.Input label='Movie Name' value={movie} onChange={(e) => { setmovie(e.target.value) }} />
      <Button onClick={addmovie}>ADD</Button>
      <hr />

      {
        list.map((item, index) => {
          return (
            <p key={index}>{item.title.rendered}</p>
          )
        })
      }
    </div>
  )
}
