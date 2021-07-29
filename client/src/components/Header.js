import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap';

export default function Header() {
    return (
        <div>
            <h1>Google Books</h1>
            <Nav>
                <NavItem>
                    <NavLink className="navlinks" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="navlinks" to="/search">Search</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="navlinks" to="saved">Saved</NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}


