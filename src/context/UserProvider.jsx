/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { userContext } from './userContext'
import { json } from 'zod';

export const UserProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    const isAutheticated = Boolean(token)

    const logIn = ({ user, token }) => {
        setToken(token || null)
        setUser(user || null)

        if (token) {
            localStorage.setItem("token", token)
        }

        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        }
        setLoading(false)
    }

    const logOut = () => {
        localStorage.clear('token')
        localStorage.clear("user")
        setUser(null)
        setToken(null)
    }


    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        const savedToken = localStorage.getItem('token')

        try {
            if (savedUser) {
                const perSavedUser = JSON.parse(savedUser)
                setUser(perSavedUser)
            }
            if (savedToken) {
                setToken(savedToken)
            }
        } catch (error) {
            console.log(error);

        }

        setLoading(false)
    }, [])


    console.log(name, 'from context');


    const value = {
        setName,
        name,
        logIn,
        logOut,
        isAutheticated,
        loading,
        user
    }
    return (
        <userContext.Provider value={value}> {children}</userContext.Provider>
    )
}
