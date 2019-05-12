import React, {Component} from 'react';

const NavBar = ({ numberOfUsers }) => {
return (
    <nav className='navbar'>
      <a href='/' className='navbar-brand'>Chatty</a>
      <span>{numberOfUsers} users online</span>
    </nav>
  );
}
export default NavBar;