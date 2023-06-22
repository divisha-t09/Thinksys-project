import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div>
        <img className='imagee' src={require('../../assests/logo.png')} />
      </div>
      
      <p className='text' >ThinkSys Partners With TruAge to Revolutionize the Retail and C-Store Industry.</p>
    </nav>
  );
};

export default Navbar;
