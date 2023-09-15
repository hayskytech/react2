import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import Contact from './Contact';
import Home from './Home';
import About from './About';
import { Container, Icon, Menu } from 'semantic-ui-react';
import Services from './Services';

export default function Main() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyMenu />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  )
}


function MyMenu() {
  return (
    <div>
      <Menu icon='labeled'>
        <Link to="/">
          <Menu.Item name='home'>
            <Icon color='blue' name='home' /> Home</Menu.Item>
        </Link>
        <Link to="/contact">
          <Menu.Item name='gamepad'>
            <Icon color='blue' name='handshake' /> Contact</Menu.Item>
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
    </div>
  )
}
