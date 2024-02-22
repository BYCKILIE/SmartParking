import React, { useEffect } from 'react'
import ParkingLot from '../Components/ParkingLot';
import Datepicker from '../Components/Datepicker';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../DataContext.jsx';
import { Link } from 'react-router-dom';

function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();

    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => {
            if (domRef.current) {
                observer.unobserve(domRef.current);
            }
        };
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

const Reservation = () => {
    const navigate = useNavigate();
    const [selectedTime, setSelectedDateTime] = useState(new Date()); // Starea pentru valoarea selectată, inițializată cu 30
    const [addedMinutes, setAddedMinutes] = useState(30);
    const [resultDateTime, setResultDateTime] = useState('');
    const [reservedDates, setReservedDates] = useState([]);
    const [error, setError] = useState(null);
    const [dateIntroduced, setDateIntroduced] = useState();
    const [dateInRange, setDateInRange] = useState();

    const { updateData } = useDataContext();

    // Update the shared data
    const handleUpdateData = () => {
        updateData({
            parkingSlot: 'some value',
            entryT: 'some value',
            // ... other data
        });
    };

    const [formData, setFormData] = useState({
        license_plate: '',
        entry: '',
        leave: '30',
        parking_slot: ''
    });

    const handleLicensePlateChange = (e) => {
        const value = e.target.value.toUpperCase();
        setFormData({
            ...formData,
            license_plate: value
        });
    };

    const handleEntryChange = (e) => {
        setDateIntroduced(e.target.value);
        setFormData({
            ...formData,
            entry: e.target.value
        });
    }

    useEffect(() => {

    }, [handleEntryChange]);

    const handleLeaveChange = (e) => {
        setFormData({
            ...formData,
            leave: e.target.value
        });
    };

    const handleReservedSlots = (dates) => {
        setReservedDates(dates);
        // console.log(dates);
    };

    const handleDateInRange = (ok) => {
        setDateInRange(ok);
    }

    const handleDateBlur = async (index) => {
        const response = await fetch('http://172.20.10.2:8000/api/state/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data);
        const date1List = data.reservations.map(reservation => new Date(reservation.entry));
        const date2List = data.reservations.map(reservation => new Date(reservation.leave));

        const formattedDate1List = date1List.map(date => date.toISOString());
        const formattedDate2List = date2List.map(date => date.toISOString());

        console.log("Date de intrare (date1):", formattedDate1List);
        console.log("Date de plecare (date2):", formattedDate2List);
        const latestId = data.reservations.reduce((maxId, reservation) => {
            return reservation.id > maxId ? reservation.id : maxId;
        }, 0);
        const reservation = data.reservations[index];
        const latestReservation = data.reservations.find(res => res.id === latestId);
        console.log(latestReservation);

        const isDateInRange = formattedDate1List.map((date1, index) => {
            const date2 = formattedDate2List[index];
            console.log(dateIntroduced);
            // Verifică dacă inputData este între date1 și date2
            if (dateIntroduced >= date1 && dateIntroduced <= date2) {
                return true;
            }
            return false;
        });
        console.log(dateIntroduced);

        console.log(isDateInRange);
        handleDateInRange(isDateInRange);
    };

    const handleParkingSlotChange = async (index) => {


        setFormData({
            ...formData,
            parking_slot: (index + 1)
        });

        

        await handleDateBlur(index);

        //handleReservedSlots([date1, date2]);
    };

    const handleDateTimeChange = (e) => {
        const selectedMinutes = parseInt(e.target.value, 10);
        setSelectedDateTime(selectedMinutes);
        addMinutes(selectedMinutes);
    };


    const handleMinutesChange = (e) => {
        const selectedValue = e.target.value;
        console.log(selectedValue);
        setAddedMinutes(parseInt(selectedValue, 10));
        setFormData({
            ...formData,
            leave: selectedValue
        });
    };

    const addMinutes = (minutes) => {
        const newDateTime = new Date(selectedTime.getTime() + minutes * 60000); // 60000 milliseconds = 1 minute
        setResultDateTime(newDateTime.toString());
        setFormData({
            ...formData,
            leave: newDateTime.toString()
        });
        console.log('Rezultat:', newDateTime.toString());
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://172.20.10.2:8000/api/reserve/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const response2 = await fetch('http://172.20.10.2:8000/api/reserve/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });



            if (response.ok) {
                console.log(formData.parking_slot);
                const paymentData = {
                    parkingSlot: formData.parking_slot,
                    entryT: formData.entry,
                    leaveT: reservedDates[1],
                    leaveTm: addedMinutes,
                    licensePlate: formData.license_plate
                }
                console.log(reservedDates[1]);
                navigate('/payment', { state: paymentData });
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }

    }

    return (
        <body className='reservation'>
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
                <h1 className='title'>Choose your parking spot</h1>

                <ParkingLot onSpotClick={handleParkingSlotChange} />

            </FadeInSection>

            <FadeInSection>
                <Datepicker onChange={handleEntryChange} reservedDates={reservedDates} dateIntroduced={dateIntroduced} dateInRange={dateInRange} onDateBlur={handleDateBlur}></Datepicker>
            </FadeInSection>

            <FadeInSection>
                <h1 className='timeAmount'>Select the amount of time you want to spend in the parking lot:</h1>
                <select value={addedMinutes} className='minutes' onChange={handleMinutesChange}>
                    <option value={30}>30m</option>
                    <option value={60}>1h</option>
                    <option value={90}>1h 30min</option>
                    <option value={120}>2h</option>
                    <option value={150}>2h 30min</option>
                    <option value={180}>3h</option>
                    <option value={210}>3h 30min</option>
                    <option value={240}>4h</option>
                    <option value={270}>4h 30min</option>
                    <option value={300}>5h</option>
                </select>

            </FadeInSection>

            <FadeInSection>
                <h1 className='license'>Introduce your license plate number:</h1>
                <input className='licenseInput' placeholder='Ex. MM77CXC' onChange={handleLicensePlateChange} value={formData.license_plate}></input>
            </FadeInSection>

            <FadeInSection>
                <Link to='/payment'>
                    <button className='pay' onClick={handleSubmit} >Go to payment</button>
                </Link>
            </FadeInSection>


            <h5 className='outroh'>XXXXXXXXXXXXXXXXXXXXX</h5>
            <p className='credits'>&copy;2024 SmartPark by <br />
                <i class="fa fa-instagram"></i>casiancriste <br />
                <i class="fa fa-instagram"></i>tudor_ov</p>

        </body>
    )
}

export default Reservation
