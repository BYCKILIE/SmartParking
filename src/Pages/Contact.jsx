import React from 'react'

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

const Contact = () => {
    return (
        <body className='contact'>

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

            <FadeInSection>
                <div>
                    <h1>Contact</h1>
                    <div className='contactinfo'>
                        <div className='column0'>
                            <i class="material-icons"> &#xe7ff; </i>
                            <h2 className='title'>Name</h2>
                            <p className='text'>Criste Casian <br /> Bichilie Tudor</p>
                        </div>
                        <div className='column1'>
                            <i class="material-icons">&#xe0be; </i>
                            <h2 className='title'>Email</h2>
                            <p className='text'>redwidow741@gmail.com <br /> tudorovidiub@gmail.com</p>
                        </div>
                        <div className='column2'>
                            <div className='insta'>
                                <i class="fa fa-instagram"></i>
                            </div>
                            <h2 className='title'>Instagram</h2>
                            <p className='text'>
                                <i class="fa fa-instagram"></i>casiancriste <br />
                                <i class="fa fa-instagram"></i>tudor_ov</p>
                        </div>
                        <div className='column3'>
                            <i class="material-icons">&#xe0cd; </i>
                            <h2 className='title'>Phone</h2>
                            <p className='text'>0743031248 <br /> 0735290433</p>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <p className='credits'>&copy;2024 SmartPark by <br />
                <i class="fa fa-instagram"></i>casiancriste <br />
                <i class="fa fa-instagram"></i>tudor_ov</p>
        </body>
    )
}

export default Contact
