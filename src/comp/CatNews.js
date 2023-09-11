import React, { useEffect, useState } from 'react'
import { Button, Header, Icon, List, Modal, Segment } from 'semantic-ui-react'

export default function CatNews() {
  const [cats, setcats] = useState([])
  const [posts, setposts] = useState([])
  const [category, setcategory] = useState('')
  const [offset, setoffset] = useState(0)
  const [box, setbox] = useState(false)
  const [box2, setbox2] = useState(false)
  const [loading, setloading] = useState(true)

  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')

  // const web = 'https://telugudunia-in.stackstaging.com/'
  const web = 'https://dharshininews.com/'

  useEffect(() => {
    fetch(web + 'wp-json/wp/v2/categories/?_fields=id,name&per_page=100')
      .then(res => res.json())
      .then(json => {
        setcats(json)
      })
  }, [])

  useEffect(() => {
    let data = {
      _fields: 'id,title,content',
      per_page: 10,
      offset: offset
    }
    if (category) {
      data.categories = category
    }
    const params = new URLSearchParams(data).toString()
    fetch(web + 'wp-json/wp/v2/posts?' + params)
      .then(res => res.json())
      .then(json => {
        setposts(json)
        setloading(false)
      })
  }, [category, offset])

  return (
    <div>

      <List verticalAlign='middle'>
        <List.Item>
          <List.Content floated='right'>
            <Button color='blue' icon onClick={() => { setbox(true) }}>
              <Icon name='bars' />
            </Button>
          </List.Content>
          <Header as='h2'>Haysky News</Header>
        </List.Item>
      </List>


      <Modal
        closeIcon
        onClose={() => setbox(false)}
        onOpen={() => setbox(true)}
        open={box}
      >
        <Modal.Content>
          <Modal.Description>
            {
              cats.map((item) => {
                return (
                  <Header as='h3'
                    onClick={() => {
                      setcategory(item.id)
                      setoffset(0)
                      setloading(true)
                      setbox(false)
                    }}>{item.name}</Header>
                )
              })
            }
          </Modal.Description>
        </Modal.Content>
      </Modal>


      <div>
        {offset > 10 ? <Button color='blue' onClick={() => { setoffset(offset - 10); setloading(true) }}>Previous</Button> : ''}
        <Button color='blue' onClick={() => { setoffset(offset + 10); setloading(true) }}>Next</Button>
      </div>


      {
        loading ? <Icon loading name='spinner' size='huge' /> :

          posts.map((item) => {
            return (
              <List divided relaxed>
                <List.Item>
                  <List.Icon name='angle double right' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'
                      onClick={() => {
                        setbox2(true)
                        settitle(item.title.rendered)
                        setcontent(item.content.rendered)
                      }}
                    >{item.title.rendered}</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            )
          })
      }


      <Modal
        closeIcon
        onClose={() => setbox2(false)}
        onOpen={() => setbox2(true)}
        open={box2}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>{title}</Header>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Modal.Description>
        </Modal.Content>

      </Modal>

    </div>
  )
}
