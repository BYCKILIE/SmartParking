// Create a new file, e.g., DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState({});

    const updateData = (data) => {
        setSharedData(data);
    };

    return (
        <DataContext.Provider value={{ sharedData, updateData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
