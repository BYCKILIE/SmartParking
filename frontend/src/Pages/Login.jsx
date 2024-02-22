import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Account from "./Account";
import { useEffect } from "react";
import React from "react";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,  
      email: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormComplete =
      formData.email &&
      formData.password;

    if (isFormComplete) {
      try {
        const response = await fetch('http://172.20.10.2:8000/api/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          })
        });

        if (response.ok) {

          setFormData({
            email: '',
            password: ''
          });

          alert('Login successful!');
          navigate('/homePage');

        } else {
          alert('Login failed!');
        }
      } catch (error) {
        console.error('Error loging:', error);
        alert('An error occurred while loging.');
      }
    }
    else {
      alert("Please fill in all fileds!");
    }

  };

  const handleKeyDown = (e) => {
    console.log("enter")
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <body className="screen-1">
      <div className="screen-1-login">

        <div className="logo">
          <img src="src/Images/smartpark-high-resolution-logo-transparent.png" />
        </div>

        <div className="email">
          <label for="email">Email Address</label>
          <div class="sec-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
            <input type="email" name="email" placeholder="Username@gmail.com" onInput={handleEmailChange} />
          </div>
        </div>

        <div class="password">
          <label for="password">Password</label>
          <div class="sec-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
            </svg>
            <input class="pas" type="password" name="password" placeholder="············" onInput={handlePasswordChange} />
          </div>
        </div>

        <button class="login" onClick={handleSubmit} onKeyUp={(e) =>handleKeyDown(e)}>Login </button>

        <div>
          <p className="without">Don't have an account?</p>
        </div>

        <div class="footer">
          <a href="/signup">Signup</a>
        </div>


      </div>

    
    </body>
  )
}

export default Login