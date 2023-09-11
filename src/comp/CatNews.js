import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function CatNews() {
  const [cats, setcats] = useState([])
  const [posts, setposts] = useState([])
  const [category, setcategory] = useState('')

  const web = 'https://telugunewsadda.com/'

  useEffect(() => {
    fetch(web + 'wp-json/wp/v2/categories/?_fields=id,name&per_page=100')
      .then(res => res.json())
      .then(json => {
        setcats(json)
      })
  }, [])

  useEffect(() => {
    let data = {
      _fields: 'id,title',
      per_page: 10,
      offset: 0
    }
    if (category) {
      data.categories = category
    }
    const params = new URLSearchParams(data).toString()
    fetch(web + 'wp-json/wp/v2/posts?' + params)
      .then(res => res.json())
      .then(json => {
        setposts(json)
      })
  }, [category])

  return (
    <div>
      <Navbar expand="lg" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Haysky News</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                cats.map((item) => {
                  return (
                    <Nav.Link onClick={() => { setcategory(item.id) }}>{item.name}</Nav.Link>
                  )
                })
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {
        posts.map((item) => {
          return (
            <p>{item.title.rendered}</p>
          )
        })
      }
    </div>
  )
}
