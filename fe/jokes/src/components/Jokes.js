import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Jokes = () => {
  const [jokes, setJokes] = useState([])
  useEffect(() => {
    axiosWithAuth()
      .get('/api/jokes')
      .then(response => {
        console.log(response.data)
        setJokes(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return(
    <div>
      Jokez!
      {jokes.map(joke => {
        return(
          <p key={joke.id}>{joke.joke}</p>
        )
      })}
    </div>
  )
}

export default Jokes;