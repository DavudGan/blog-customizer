// AppStateContext.tsx

import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface AppState {
    fontFamily: string;
    setFontFamily: Dispatch<SetStateAction<string>>;
    fontSize: string;
    setFontSize: Dispatch<SetStateAction<string>>;
    fontColor: string;
    setFontColor: Dispatch<SetStateAction<string>>;
    backgroundColor: string;
    setBackgroundColor: Dispatch<SetStateAction<string>>;
    contentWidth: string;
    setContentWidth: Dispatch<SetStateAction<string>>;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};

interface AppStateProviderProps {
    children: React.ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
    const [fontFamily, setFontFamily] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [fontColor, setFontColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [contentWidth, setContentWidth] = useState('');

    const state: AppState = {
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
        fontColor,
        setFontColor,
        backgroundColor,
        setBackgroundColor,
        contentWidth,
        setContentWidth
    };

    return (
        <AppStateContext.Provider value={state}>
            {children}
        </AppStateContext.Provider>
    );
};
