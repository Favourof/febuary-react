import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../context/userContext'

export const Navber = () => {

    const { user, isAutheticated, logOut } = useContext(userContext)
    return (
        <div style={{ padding: "10px", color: "white", display: "flex", justifyContent: "space-between", backgroundColor: "gray", boxShadow: "2px 2px 2px black", paddingInline: "40px" }}>
            <div>LOGO {user?.name}</div>
            <div>
                <ul>
                    <li><Link to={"/"}>Home</Link> </li>

                    <li><Link to="product">Product</Link> </li>
                    <li><Link to="about">About</Link> </li>
                    <li><Link to="contact"> Contact</Link></li>
                    <li><Link to={`profile/${user}`}>profile</Link></li>
                    <li>
                        {isAutheticated ? <li onClick={() => logOut()}>Log out</li> : <div>
                            <Link to="register"> Register</Link>
                            <Link to="login"> Login</Link>
                        </div>}

                    </li>
                </ul>
            </div>
        </div>
    )
}
