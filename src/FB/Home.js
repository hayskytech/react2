import React from 'react'
import OTPLogin from './OTPLogin'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export default function Home(p) {
  const db = getDatabase();
  const [list, setlist] = useState([])
  const [item, setitem] = useState('')
  useEffect(() => {
    if (p.user) {
      const Ref = ref(db, 'todos/' + p.user.uid);
      onValue(Ref, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setlist(Object.values(data))
        }
      });
    }
  }, [p.user])

  function additem(e) {
    e.preventDefault()
    const postListRef = ref(db, 'todos/' + p.user.uid);
    const newPostRef = push(postListRef);
    set(newPostRef, item);
    setitem('')
  }
  return (
    <div>
      <OTPLogin user={p.user} setuser={p.setuser} />
      <Form onSubmit={additem}>
        Add New Item:
        <Input type="text" value={item} onChange={(e) => { setitem(e.target.value) }} />
        <Button color='blue'>Add</Button>
      </Form>
      <h2>TodoList</h2>

      {
        list.map((item) => {
          return (<li>{item}</li>)
        })


      }

    </div>
  )
}
