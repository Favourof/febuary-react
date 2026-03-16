import React from 'react'
import { useParams } from 'react-router-dom'

export const Profile = () => {
    // const param = useParams()
    const { user } = useParams()
    console.log(user);

    return (
        <div>
            <h1>Profile</h1>
            <p>name: {user}</p>
        </div>
    )
}
