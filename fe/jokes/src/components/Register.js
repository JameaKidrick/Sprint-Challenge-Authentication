import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Register = props => {
  const [credentials, setCredentials] = useState({username: '', password: ''})

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(credentials)
    register(credentials)
  }

  const register = (credentials) => {
    axiosWithAuth()
      .post('/api/auth/register', credentials)
      .then(response => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        props.history.push('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return(
    <div>
      Register!
      <form onSubmit={handleSubmit}>
        <input 
          name='username'
          type='text'
          placeholder='username'
          onChange={handleChange}
        />
        <input 
          name='password'
          type='text'
          placeholder='password'
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Register;