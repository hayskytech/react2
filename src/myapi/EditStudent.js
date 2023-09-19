import React, { useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

export default function EditStudent(p) {

  const [stu, setstu] = useState(
    {
      title: '',
      phone: '',
      date_of_birth: ''
    }
  )

  function handletitle(e) {
    setstu(prev => ({
      ...prev,
      title: e.target.value
    })
    )
  }
  function handlephone(e) {
    setstu(prev => ({
      ...prev,
      phone: e.target.value
    })
    )
  }


  function handleform() {
    console.log(stu)
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
              <input value={stu.title} onChange={handletitle} />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input value={stu.phone} onChange={handlephone} />
            </Form.Field>
            <Form.Field>
              <label>Date of birth</label>
              <input type='date' value={stu.dob}
                onChange={(e) => {
                  setstu(prev => ({
                    ...prev, date_of_birth: e.target.value
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
