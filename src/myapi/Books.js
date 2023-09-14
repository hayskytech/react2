import React, { useEffect, useState } from 'react'

export default function Books() {
  const [books, setbooks] = useState([])
  const [title, settitle] = useState('')
  const [price, setprice] = useState('')
  const [year, setyear] = useState('')
  const [author, setauthor] = useState('')
  const [msg, setmsg] = useState('')
  const url = 'http://localhost/qhaysky.com/wp-json/wp/v2/book'
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setbooks(json)
      })
  }, [])

  function handleform(e) {
    e.preventDefault()
    setmsg('loading...')
    if (title === '' || year === '' || price === '' || author === '') {
      setmsg('all fields are mandatory')
      return
    }
    const postdata = {
      title: title,
      status: 'publish',
      acf: {
        year: year,
        author: author,
        price: price
      }
    }
    const reqdata = {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("admin:admin"),
      },
      body: JSON.stringify(postdata)
    }

    fetch(url, reqdata)
      .then(res => res.json())
      .then(json => {
        if (json.id) {
          setmsg('Post added successfully...')
          settitle('')
          setauthor('')
          setprice('')
          setyear('')
        } else {
          setmsg(json.code)
        }
      })

  }

  return (
    <div>
      <form onSubmit={handleform}>
        <div>
          <label htmlFor="">Title</label>
          <input type="text" value={title} onChange={(e) => { settitle(e.target.value) }} />
        </div>
        <div>
          <label htmlFor="">year</label>
          <input type="text" value={year} onChange={(e) => { setyear(e.target.value) }} />
        </div>
        <div>
          <label htmlFor="">Price</label>
          <input type="text" value={price} onChange={(e) => { setprice(e.target.value) }} />
        </div>
        <div>
          <label htmlFor="">Author</label>
          <input type="text" value={author} onChange={(e) => { setauthor(e.target.value) }} />
        </div>
        <div>
          <button>Add</button>
        </div>
        <div>
          {msg}
        </div>
      </form>

      <hr />
      <h1>List of Books</h1>


      {
        books.map((item) => {
          return (
            <div>
              <p><b>{item.title.rendered}</b></p>
              Year: {item.acf.year} - Rs.{item.acf.price} - Author: {item.acf.author}
            </div>
          )
        })
      }
    </div>
  )
}
