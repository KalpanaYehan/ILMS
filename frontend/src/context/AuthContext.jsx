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

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     const userObject = storedUser ? JSON.parse(storedUser) : null;
        
    //     if (userObject) {
    //         setUser(userObject);
    //     } else {
    //         // If no user is stored, redirect to login page
    //         navigate('/');
    //     }
    // }, [navigate]);
    // Redirect to login if user logs out
    // useEffect(() => {
    //     if (!user) {
    //         navigate('/');
    //     }
    // }, [user, navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
