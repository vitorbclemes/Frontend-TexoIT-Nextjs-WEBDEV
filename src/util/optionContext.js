"use client"

import React, { createContext, useContext, useState } from 'react';

const OptionContext = createContext();

export default function OptionProvider({ children }) {
    const [option, setOption] = useState('');

    return (
        <OptionContext.Provider value={{
            option,
            setOption
        }}>
            {children}
        </OptionContext.Provider>
    );
}

export function useOption() {
    const context = useContext(OptionContext);
    const { option, setOption } = context;
    return { option, setOption };
}
