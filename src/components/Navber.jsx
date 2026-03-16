import React from 'react'
import { Link } from 'react-router-dom'

export const Navber = () => {
    const user = 'bolu'
    return (
        <div style={{ padding: "10px", color: "white", display: "flex", justifyContent: "space-between", backgroundColor: "gray", boxShadow: "2px 2px 2px black", paddingInline: "40px" }}>
            <div>LOGO</div>
            <div>
                <ul>
                    <li><Link to={"/"}>Home</Link> </li>

                    <li><Link to="product">Product</Link> </li>
                    <li><Link to="about">About</Link> </li>
                    <li><Link to="contact"> Contact</Link></li>
                    <li><Link to={`profile/${user}`}>profile</Link></li>
                </ul>
            </div>
        </div>
    )
}
