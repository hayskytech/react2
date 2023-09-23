import React, { useState } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'

export default function Login() {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [token, settoken] = useState(localStorage.getItem('token'))
  const [displayName, setdisplayName] = useState(localStorage.getItem('displayName'))
  function dologin() {
    let url = 'https://telugudunia-in.stackstaging.com/wp-json/jwt-auth/v1/token'
    const data = {
      username: username,
      password: password,
    }
    let requestOptions = {
      method: 'POST',
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(json => {
        settoken(json.data.token)
        setdisplayName(json.data.displayName)
        localStorage.setItem('token', json.data.token);
        localStorage.setItem('displayName', json.data.displayName);
      })
  }
  function dologout() {
    settoken('')
    setdisplayName('')
    localStorage.setItem('token', '');
    localStorage.setItem('displayName', '');
  }
  return (
    <div>
      <Container>
        {token ?
          <>
            <br />
            <p>You are logged in as {displayName}...</p>
            <Button color='red' onClick={dologout}>Logout</Button>
          </>
          :
          <>
            <h2>Login Form</h2>
            <Form>
              <Form.Input label='Username' type='text' onChange={(e) => { setusername(e.target.value) }} value={username} />
              <Form.Input label='Password' type='password' onChange={(e) => { setpassword(e.target.value) }} value={password} />
            </Form>
            <Button onClick={dologin}>Login</Button>
          </>
        }
      </Container>
    </div>
  )
}
