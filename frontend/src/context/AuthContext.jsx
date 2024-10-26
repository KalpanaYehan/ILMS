import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    
    useEffect(()=>{
        const storeUser = localStorage.getItem('user')
        const userObject = storeUser ? JSON.parse(storeUser) : null;
        if(userObject){
            setUser(userObject)
        }
    },[]) 

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
