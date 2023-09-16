import React, { useEffect, useState } from 'react'
import Student from './Student'

export default function AllStudents() {
  const [list, setlist] = useState([])
  useEffect(() => {
    const url = 'https://djando-code.000webhostapp.com/wp-json/wp/v2/student'
    const data = {
      per_page: 10,
      _fields: 'id,title,acf'
    }
    const params = new URLSearchParams(data).toString()
    fetch(url + '?' + params)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setlist(json)
      })
  }, [])
  return (
    <div>
      {
        list.map((item) => {
          return (<Student item={item} />)
        })
      }
    </div>
  )
}
