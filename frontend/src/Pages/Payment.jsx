import React from 'react'
import { useState } from 'react';
import { useDataContext } from '../DataContext';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    
    const location = useLocation();
    const { parkingSlot, entryT, leaveT, leaveTm, licensePlate } = location?.state || {};
    const [expirationDate, setExpirationDate] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');

    const { sharedData } = useDataContext();

    const handleCardChange = (e) => {
        let value = e.target.value;

        // Eliminăm caracterele non-numerice
        value = value.replace(/\D/g, '');

        // Adăugăm spații la fiecare grup de 4 cifre
        if (value.length <= 16) {
            value = value.replace(/(.{4})/g, '$1 ').trim();
            setCardNumber(value);
        }
    };

    const handleExpirationDateChange = (e) => {
        let value = e.target.value;

        // Asigură-te că valoarea conține doar cifre
        value = value.replace(/\D/g, '');

        // Adaugă "/" după primele două caractere
        if (value.length <= 2) {
            setExpirationDate(value);
        } else if (value.length === 3) {
            setExpirationDate(`${value.slice(0, 2)}/${value.slice(2)}`);
        } else if (value.length > 3) {
            setExpirationDate(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
        }
    };

    const handleCVVChange = (e) => {
        let value = e.target.value;

        // Limitează la maxim 3 cifre
        value = value.slice(0, 3);

        // Asigură-te că valoarea conține doar cifre
        value = value.replace(/\D/g, '');

        setCVV(value);
    };

    const formatDateTime = (dateTimeString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDateTime = new Date(dateTimeString).toLocaleDateString('en-US', options);
        return formattedDateTime;
      };

    console.log(parkingSlot);

    return (
        <body className='payment'>

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

            <div className='payment-form'>

                <h1>Payment Form</h1>

                <div className='card'>
                    <label for='card'>Card Number</label>
                    <div className='input-card'>
                        <input type='card' name='card' placeholder='xxxx xxxx xxxx xxxx' value={cardNumber} onChange={handleCardChange} />
                    </div>
                </div>

                <div className='second-row'>
                    <div className='exp-date'>
                        <label for='exp-date'>Expiration Date</label>
                        <div className='input-exp-date'>
                            <input type='exp-date' name='exp-date' placeholder='01/30' value={expirationDate} onChange={handleExpirationDateChange} />
                        </div>
                    </div>

                    <div className='cvv'>
                        <label for='cvv'>CVV</label>
                        <div className='input-cvv'>
                            <input type='cvv' name='cvv' placeholder='123' value={cvv} onChange={handleCVVChange} />
                        </div>
                    </div>
                </div>

                <div className='info'>
                    <h3>Informations:</h3>
                    <p>Parking Slot: {parkingSlot}</p>
                    <p>Entry Time: {formatDateTime(entryT)}</p>
                    <p>License Plate: {licensePlate}</p>
                    <p>Leave Time (minutes): {(leaveTm) / 30} &euro;</p>
                </div>

                <div className='buttons'>
                    <a href='./homePage'>
                        <button className='confirm'>Confirm</button>
                    </a>
                    <a href='./reservation'>
                        <button className='back'>Back</button>
                    </a>
                </div>

            </div>

            <div>
                <p className='credits'>&copy;2024 SmartPark by <br />
                    <i class="fa fa-instagram"></i>casiancriste <br />
                    <i class="fa fa-instagram"></i>tudor_ov</p>
            </div>

        </body>
    )
}

export default Payment
