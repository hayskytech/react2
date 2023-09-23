import React, { useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

export default function EditStudent(p) {

  function handletitle(e) {
    p.setstu(prev => ({
      ...prev,
      title: { rendered: e.target.value }
    })
    )
  }
  function handlephone(e) {
    p.setstu(prev => ({
      ...prev,
      acf: {
        ...prev.acf,
        phone: e.target.value
      }
    })
    )
  }


  function handleform() {
    // saving data via API
    const url = 'http://localhost/qhaysky.com/wp-json/wp/v2/person/227/'
    let requestOptions = {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Authorization": 'Basic ' + btoa('admin:admin'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title": "hello"
      })
    }
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(json => console.log(json))
  }
  return (
    <div>
      <button onClick={() => { p.setbox(true) }}>OK</button>
      <Modal
        onClose={() => p.setbox(false)}
        onOpen={() => p.setbox(true)}
        open={p.box}
      >
        <Modal.Content>

          <Form>
            <Form.Field>
              <label>Student Name</label>
              <input value={p.stu?.title.rendered} onChange={handletitle} />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input value={p.stu.acf.phone} onChange={handlephone} />
            </Form.Field>
            <Form.Field>
              <label>Date of birth</label>
              <input type='date' value={p.stu.acf.date_of_birth}
                onChange={(e) => {
                  p.setstu(prev => ({
                    ...prev,
                    acf: {
                      ...prev.acf,
                      date_of_birth: e.target.value
                    }
                  }))
                }}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => p.setbox(false)}>Close</Button>
          <Button
            onClick={handleform}
            color='green'
          >Save changes</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}
