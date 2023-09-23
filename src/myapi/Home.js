import React from 'react'
import Login from './Login'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import AllStudents from './AllStudents';
import Homepage from './Homepage';
import Movie from './Movie';

export default function Home() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyMenu />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="movies" element={<Movie />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
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
        <Link to="/login">
          <Menu.Item name='login'>
            <Icon color='blue' name='lock' /> Login</Menu.Item>
        </Link>
        <Link to="/movies">
          <Menu.Item name='movies'>
            <Icon color='blue' name='camera' /> Movies</Menu.Item>
        </Link>
      </Menu>
      <Outlet />
    </div>
  )
}
