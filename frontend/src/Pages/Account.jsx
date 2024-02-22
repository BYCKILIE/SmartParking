import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import MyContext from './Login.jsx';



function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();

    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);

        return () => observer.unobserve(domRef.current);
    }, []);

    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}

const Account = () => {

    const [apiData, setApiData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: '',
        cnp: '',
        address: '',
        password: ''
    });

    const fetchData = async () => {
        try {
            const response = await fetch('http://172.20.10.2:8000/api/mydata/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setApiData(data);

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = async (e) => {
        const response2 = await fetch('http://172.20.10.2:8000/api/logout/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return (
        <body className='account'>
            <nav>
                <a href="./homePage" className='logo'>
                    <img src="src/Images/smartpark-high-resolution-logo-white-transparent.png" />
                </a>
                <ul>
                    <li>
                        <a href='./homePage'>Home</a>
                    </li>
                    <li>
                        <a href='./reservation'>Reservation</a>
                    </li>
                    <li>
                        <a href='./contact'>Contact</a>
                    </li>
                    <li>
                        <a href='./account'>Account</a>
                    </li>
                </ul>
            </nav>

            <div className='myaccount'>
                <h1>Personal information</h1>

                <div className='signup-names'>
                    <div className='signup-firstname'>
                        <label for='signup-firstname'>First Name</label>
                        <div className='input-signup-firstname'>
                            <input type='signup-firstname' name='signup-firstname' value={JSON.stringify(apiData.first_name).replace(/['"]+/g, '')} readOnly />
                        </div>
                    </div>

                    <div className='signup-lastname'>
                        <label for='signup-lastname'>Last Name</label>
                        <div className='input-signup-lastname'>
                            <input type='signup-lastname' name='signup-lastname' value={JSON.stringify(apiData.last_name).replace(/['"]+/g, '')} readOnly />
                        </div>
                    </div>
                </div>

                <div className='signup-email-phone'>
                    <div className='signup-email'>
                        <label for='signup-email'>Email</label>
                        <div className='input-signup-email'>
                            <input type='signup-email' name='signup-email' value={JSON.stringify(apiData.email).replace(/['"]+/g, '')} readOnly />
                        </div>
                    </div>
                    <div className='signup-phone'>
                        <label for='signup-phone'>Phone</label>
                        <div className='input-signup-phone'>
                            <input type='signup-phone' name='signup-phone' value={JSON.stringify(apiData.phone).replace(/['"]+/g, '')} readOnly />
                        </div>
                    </div>
                </div>

                <div className='signup-address'>
                    <label for='signup-adress'>Address</label>
                    <div className='input-signup-address'>
                        <input type='signup-address' name='signup-address' value={JSON.stringify(apiData.address).replace(/['"]+/g, '')} readOnly />
                    </div>
                </div>

                <div className='signup-cnp-pass'>
                    <div className='signup-cnp'>
                        <label for='signup-cnp'>CNP</label>
                        <div className='input-signup-cnp'>
                            <input type='signup-cnp' name='signup-cnp' value={JSON.stringify(apiData.cnp).replace(/['"]+/g, '')} readOnly />
                        </div>
                    </div>

                    <div className='password'>
                        <label for='password'>Password</label>
                        <div className='input-password'>
                            <input type='password' name='password' value={JSON.stringify(apiData.password).replace(/['"]+/g, '')} readOnly />
                        </div>
                    </div>
                </div>

                <a href='/login' class="logout1">
                    <button class="logout" onClick={handleLogout}>Log Out</button>
                </a>
            </div>

        </body>
    )
}

export default Account
