import React from 'react'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import Home from './Home'
import { useState } from 'react'
import Teams from './Teams'

export default function Main() {
  const [user, setuser] = useState('hai')
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />}>
            <Route path="" element={<Home user={user} setuser={setuser} />} />
            <Route path="teams" element={<Teams user={user} setuser={setuser} />} />
            {/* <Route path="books" element={<Books />} /> */}

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
function MainMenu() {
  return (
    <>
      <Menu icon='labeled'>
        <Link to="/">
          <Menu.Item name='home'>
            <Icon color='blue' name='home' /> Home</Menu.Item>
        </Link>
        <Link to="/teams">
          <Menu.Item name='gamepad'>
            <Icon color='blue' name='handshake' /> Teams</Menu.Item>
        </Link>
        <Link to="/about">
          <Menu.Item name='user'>
            <Icon color='blue' name='user' /> About</Menu.Item>
        </Link>
        <Link to="/services">
          <Menu.Item name='gamepad'>
            <Icon color='blue' name='info' /> Services</Menu.Item>
        </Link>
      </Menu>
      <Outlet />
    </>
  )
}