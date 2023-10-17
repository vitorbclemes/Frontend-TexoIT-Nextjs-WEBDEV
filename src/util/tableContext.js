"use client"

import React, { createContext, useContext, useState } from 'react';

const tableContext = createContext();

export default function TableProvider({ children }) {
    const [selectedYear, setSelectedYear] = useState('');
    const [isWinner,setIsWinner] = useState(false);

    return (
        <tableContext.Provider value={{
            selectedYear,
            setSelectedYear,
            isWinner,
            setIsWinner
        }}>
            {children}
        </tableContext.Provider>
    );
}

export function useTable() {
    const context = useContext(tableContext);
    const { selectedYear, setSelectedYear,isWinner,setIsWinner } = context;
    return { selectedYear, setSelectedYear,isWinner,setIsWinner };
}