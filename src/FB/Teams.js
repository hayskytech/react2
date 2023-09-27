import React from 'react'
import { getDatabase, onValue, push, ref, set } from "firebase/database";

import { useEffect, useState } from 'react'


export default function Teams(p) {
  const db = getDatabase();
  const [teams, setteams] = useState([])
  const [all, setall] = useState(null)
  const [name, setname] = useState('')
  useEffect(() => {
    if (p.user) {
      const Ref = ref(db, 'teams');
      onValue(Ref, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setteams(Object.keys(data))
          setall(data);
        }
      });
    }
  }, [p.user])
  return (
    <div>
      <h1>Teams</h1>
      {Object.keys(all).map((team) => {
        return (
          <>
            <h3>{team}</h3>
            <ol>
              {
                Object.values(all[team]).map((player) => {
                  return (<li>{player}</li>)
                })
              }
            </ol>
          </>
        )
      })}
    </div>
  )
}
