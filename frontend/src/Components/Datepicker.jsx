import React, { useState } from 'react'
import { useEffect } from 'react';

const Datepicker = ({ onChange, reservedDates, dateIntroduced, dateInRange, onDateBlur}) => {
  const [datetime, setDateTime] = useState('');
  const today = new Date();
  const [error, setError] = useState('');

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
    onChange(e);
  };

  useEffect(() => {
    onDateBlur(); // Notifică componenta părinte despre evenimentul onDateBlur
  }, [datetime, onDateBlur]);

  useEffect(() => {
    // Check if the introduced date is within the reserved range
    console.log(dateInRange === true);
    if (dateInRange && dateInRange.some(value => value === true)) {
      setError("The selected date is reserved. Please choose another date.");
    } else {
      setError(null);
    }
  }, [dateInRange]);


  return (
    <div className='datetime'>
      <h1>Select Date and Time:</h1>
      {error && <p className="error-message">{error}</p>}
      <input type="datetime-local" value={datetime} onChange={handleDateTimeChange} />
    </div>
  );
};

export default Datepicker
