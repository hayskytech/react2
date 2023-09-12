import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, TextArea } from 'semantic-ui-react';

export default function AddNews() {
  const [list, setlist] = useState([])
  const [box, setbox] = useState(false)
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')
  const [refresh, setrefresh] = useState(false)
  const url = 'http://telugudunia-in.stackstaging.com/wp-json/wp/v2/posts'


  // loading posts
  useEffect(() => {
    let data = {
      _fields: 'id,title'
    }
    const params = new URLSearchParams(data).toString()
    fetch(url + '?' + params)
      .then(res => res.json())
      .then(json => {
        setlist(json);
      })
  }, [refresh]);

  function addpost() {
    console.log(btoa('test:test@768'))
    const postdata = {
      title: title,
      content: content,
      status: 'publish'
    }
    const reqoptions = {
      method: 'POST',
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("test:test@768"),
      },
      body: JSON.stringify(postdata)
    }
    setrefresh(false)
    fetch(url, reqoptions)
      .then(res => res.json())
      .then(json => {
        settitle('')
        setcontent('')
        setrefresh(true)
        setbox(false)
      })
  }

  return (
    <div>
      <Button onClick={() => { setbox(true) }} color='green'>Add News</Button>

      {
        list.map((item) => {
          return (<p>{item.title.rendered}</p>)
        })
      }

      <Modal
        closeIcon
        onClose={() => { setbox(false) }}
        onOpen={() => { setbox(true) }}
        open={box}
      >
        <Modal.Header>Add New Post</Modal.Header>
        <Modal.Content>

          <Form>
            <Form.Field>
              <label>News Title</label>

              <input type='text'
                value={title}
                onChange={(e) => { settitle(e.target.value) }}
              />

            </Form.Field>
            <Form.Field>
              <label>Content</label>

              <TextArea
                value={content}
                onChange={(e) => { setcontent(e.target.value) }}
              />

            </Form.Field>
          </Form>
          <Button color='blue' onClick={addpost}>Add</Button>

        </Modal.Content>

      </Modal>

    </div>
  )
}
