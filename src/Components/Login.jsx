import React, { useState, useEffect } from 'react';
import './login.css';

import userIcon from './Assets/person.png';
import passIcon from './Assets/password.png';

const Login = (prop) => {

  useEffect(() => {
    if (localStorage.getItem('token')) {
      prop.auth(true);
      return;
    }
  }, []);
  
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cred = formData.get('cred');
    const pwd = formData.get('password');

    await fetch('https://learn.reboot01.com/api/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${cred}:${pwd}`)}`,
        'Content-Type': 'application/json',
      },
    }).then(async (resp) => {
      console.log("Response status: ", resp.status);
      if (resp.status !== 200) {
        setErrorMsg('Invalid Credentials.');
        document.getElementById('pwd').innerHTML = "";
      } else {
        setErrorMsg('');
        return await resp.json();
      }})
      .then((token) => {
        localStorage.setItem("token", token);
        prop.auth(true);
        console.log("Token:", token); //TODO: remove this
      })
    .catch((error) => {
      console.error("Error:", error);
      setErrorMsg('An error occurred.');
    });
  }


  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Log In</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <div className='input'>
            <img src={userIcon} alt="user icon" />
            <input type="text" name='cred' id='pwd' placeholder='Email or Username' required />
          </div>
          <div className='input'>
            <img src={passIcon} alt="password icon" />
            <input type="password" name='password' placeholder='Password' required />
          </div>
          <div className='error'>{errorMsg}</div>
        </div>
        <button className='submit'>Log In</button>
      </form>
    </div>
  )
}

export default Login;