import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    cnp: '',
    address: '',
    password: ''
  });

  const handleFirstNameChange = (e) => {
    setFormData({
      ...formData,
      first_name: e.target.value
    });
  };

  const handleLastNameChange = (e) => {
    setFormData({
      ...formData,
      last_name: e.target.value
    });
  };

  const handleCnpChange = (e) => {
    setFormData({
      ...formData,
      cnp: e.target.value
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value
    });
  };

  const handlePhoneChange = (e) => {
    setFormData({
      ...formData,
      phone: e.target.value
    });
  };

  const handleAdressChange = (e) => {
    setFormData({
      ...formData,
      address: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value
    });
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormComplete =
      formData.first_name &&
      formData.last_name &&
      formData.email &&
      formData.phone &&
      formData.gender &&
      formData.cnp &&
      formData.address &&
      formData.password;

    if (isFormComplete) {
      try {
        const response = await fetch('http://172.20.10.2:8000/api/signup/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          // Reînnoiește starea formularului după trimiterea reușită a datelor
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            cnp: '',
            address: ''
          });

          alert('Sign up successful!');
          navigate('/homePage');

        } else {
          alert('Sign up failed!');
        }
      } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred while signing up.');
      }
    }
    else {
      alert("Please fill in all fileds!");
    }
  };

  return (
    <body className='signup-page-body'>
      <div className='signup-page'>

        <div className="logo">
          <img src="src/Images/smartpark-high-resolution-logo-transparent.png" />
        </div>

        <div className="title">
          <label>Signup</label>
        </div>

        <div className='signup-names'>
          <div className='signup-firstname' >
            <label for='signup-firstname'>First Name</label>
            <div className='input-signup-firstname' >
              <input type='signup-firstname' name='signup-firstname' placeholder='John' onInput={handleFirstNameChange} />
            </div>
          </div>

          <div className='signup-lastname' >
            <label for='signup-lastname'>Last Name</label>
            <div className='input-signup-lastname' >
              <input type='signup-lastname' name='signup-lastname' placeholder='Doe' onInput={handleLastNameChange} />
            </div>
          </div>

          <div className='signup-email' >
            <label for='signup-email'>Email</label>
            <div className='input-signup-email' >
              <input type='signup-email' name='signup-email' placeholder='johndoe@gmail.com' onInput={handleEmailChange} />
            </div>
          </div>

        </div>



        <div className='signup-phone-gender'>
          <div className='signup-phone' >
            <label for='signup-phone'>Phone</label>
            <div className='input-signup-phone'>
              <input type='signup-phone' name='signup-phone' placeholder='+40747294503' onInput={handlePhoneChange} />
            </div>
          </div>

          <div className='signup-gender' >
            <label for="signup-gender">Gender</label>
            <select name="select-signup-gender" id="select-signup-gender" required onInput={handleGenderChange}>
              <option value="" disabled selected hidden>Choose one...</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className='signup-cnp' >
            <label for='signup-cnp'>CNP</label>
            <div className='input-signup-cnp' >
              <input type='signup-cnp' name='signup-cnp' placeholder='1234567890' onInput={handleCnpChange} />
            </div>
          </div>
        </div>


        <div className='signup-address-password'>
          <div className='signup-address' >
            <label for='signup-adress'>Address</label>
            <div className='input-signup-address' >
              <input type='signup-address' name='signup-address' placeholder='4124 Grove Street, Los Angeles, CA, USA' onInput={handleAdressChange} />
            </div>
          </div>

          <div className='signup-password' >
            <label for='signup-password'>Password</label>
            <div className='input-signup-password' >
              <input type='password' name='signup-password' placeholder='············' onInput={handlePasswordChange} />
            </div>
          </div>
        </div>


        <div className='buttons'>
          <a href="/login">
            <button class="back" >Back </button>
          </a>
          <button class="signup" onClick={handleSubmit}>Sign Up </button>
        </div>

      </div>
    </body>
  )
}

export default Signup
