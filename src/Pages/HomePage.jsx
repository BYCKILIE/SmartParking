import React from 'react'
import { useState, useEffect } from 'react';


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

const HomePage = () => {

    return (
        <body className='homepage'>
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

            <div className='main'>
                <img src="src/Images/main.jpg" className='mainImage' />
                <div className='welcome'>Welcome to</div>
                <div className='sm'>SmartPark</div>
                <a href='./reservation'>
                    <button className='reservation'>Make reservation</button>
                </a>
            </div>

            <FadeInSection>
                <div className='introduction'>
                    <div className='column1'>
                        <h2 className='title'>What is SmartPark?</h2>
                        <p className='text'>SmartPark is a web application specially designed to facilitate car parking in your city in a much simpler, efficient and futuristic way. All you have to do is create an account, reserve the parking space you want and select the time you want to spend in the parking lot. It's that simple!</p>
                    </div>
                    <div className='column2'>
                        <img className='introduction-image' src="src/Images/Parking-Signs.jpg" />
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className='story'>
                    <div className='column3'>
                        <img className='devices' src="src/Images/story.jpg" />
                    </div>
                    <div className='column4'>
                        <p className='storytime'>Parking is now much easier</p>
                    </div>
                </div>

            </FadeInSection>

            <FadeInSection>
                <div className='outro'>
                    <h1 className='outroh'>Make Reservation Now</h1>
                    <a href='./reservation'>
                        <button className='reserve'>Reserve</button>
                    </a>
                    <h5 className='outroh'>XXXXXXXXXXXXXXXXXXXXX</h5>
                    <p className='credits'>&copy;2024 SmartPark by <br />
                        <i class="fa fa-instagram"></i>casiancriste <br />
                        <i class="fa fa-instagram"></i>tudor_ov</p>

                </div>
            </FadeInSection>

        </body>

    )
}

export default HomePage
