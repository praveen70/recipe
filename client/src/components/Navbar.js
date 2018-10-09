import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from '../components/Auth/Signout';

const Navbar =({ session }) => (

    <nav>

{session && session.getcurrentUser ? <NavbarAuth session={session}/> : <NavbarUnAuth />}

    </nav>
)
const NavbarAuth = ({ session }) =>(
    <Fragment>
    <ul>
        
        <li>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li>
        <NavLink to='/Serach' >Search</NavLink>
        </li>
        <li>
        <NavLink to='/Recipe/AddRecipe' >Add Recipe</NavLink>
        </li>
        <li>
        <NavLink to='/Profile' >Profile</NavLink>
        </li>
        <li>
        <Signout />
        </li>
    </ul>
    <h2>Welcome {session.getcurrentUser.username}</h2>
    </Fragment>
);

const NavbarUnAuth = () =>(
        <ul>
            
            <li>
                <NavLink to='/' exact>Home</NavLink>
            </li>
            <li>
            <NavLink to='/Serach' >Search</NavLink>
            </li>
            <li>
            <NavLink to='/Signin' >Signin</NavLink>
            </li>
            <li>
            <NavLink to='/Signup' >Signup</NavLink>
            </li>
        </ul>
    );


export default Navbar;