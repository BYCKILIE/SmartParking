import React, { useState, useEffect } from 'react';

const ParkingLot = ({ onSpotClick }) => {
    const [parkingSpots, setParkingSpots] = useState([
        false, false, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true
    ]);

    useEffect(() => {
        // Aici apelezi API-ul pentru a obține informațiile despre starea parcărilor
        const fetchData = async () => {
            try {
                const response = await fetch('http://172.20.10.2:8000/api/state/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();

                // Extragi starea parcărilor
                const parkingStates = data.parking_state.map(parkingSpot => parkingSpot.state);

                

                // Actualizezi starea în componenta locală
                setParkingSpots(parkingStates);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchData(); // Apelezi funcția fetchData pentru a obține datele initiale
    }, []);

    const [selectedSpot, setSelectedSpot] = useState(null);

    const occupySpot = (spotIndex) => {
        const updatedSpots = [...parkingSpots];
        updatedSpots[spotIndex] = true;
        setParkingSpots(updatedSpots);
    };

    const freeSpot = (spotIndex) => {
        const updatedSpots = [...parkingSpots];
        updatedSpots[spotIndex] = false;
        setParkingSpots(updatedSpots);
    };

    const toggleSpot = (spotIndex) => {
        const updatedSpots = [...parkingSpots];
        const isSpotSelected = updatedSpots[spotIndex];

        if (isSpotSelected) {
            updatedSpots[spotIndex] = false;
            setSelectedSpot(null);
        } else {
            // Dacă locul nu este deja ocupat, îl ocupăm
            if (!parkingSpots[spotIndex]) {
                updatedSpots[spotIndex] = true;
                setSelectedSpot(spotIndex);
                if(spotIndex === 1){
                    updatedSpots[0] = false;
                }
                else{
                    updatedSpots[1] = false;
                }
            }
        }

        setParkingSpots(updatedSpots);
    };

    return (
        <div className="parking-lot">
            <div className="top-row">
                {parkingSpots.slice(0, 10).map((spot, index) => (
                    <div
                        className={`parking-spot-${spot ? 'occupied' : 'free'} ${selectedSpot === index ? 'Selected' : ''}`}
                        key={index}
                        onClick={() => {
                            if (index === 0 || index === 1) {
                                toggleSpot(index);
                                onSpotClick(index);
                            } else if (!parkingSpots[index]) {
                                toggleSpot(index);
                                onSpotClick(index);
                            }
                        }}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <div className="selected-spot">
                {selectedSpot !== null && (
                    <div>
                        Selected: {selectedSpot + 1}
                    </div>
                )}
            </div>
            <div className="bottom-row">
                {parkingSpots.slice(10, 20).map((spot, index) => (
                    <div
                        className={`parking-spot-${spot ? 'occupied' : 'free'}`}
                        key={index + 10}
                        onClick={() => {

                        }}
                    >
                        {index + 11}
                    </div>
                ))}
            </div>
        </div>
    );

};

export default ParkingLot;
