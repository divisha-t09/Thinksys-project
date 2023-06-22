import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <p className='text1'>&copy; 2023 ThinkSysy. All rights reserved.</p>
      <div className='Logos'>
        <a href="https://www.linkedin.com/company/thinksys-inc/mycompany/"><img className='s_img' src={require('../../assests/l.png')} /></a>
        <a href="https://twitter.com/ThinkSysInc"><img className='s_img' src={require('../../assests/t.png')} /></a>
        <a href="https://www.facebook.com/ThinkSysInc"><img className='s_img' src={require('../../assests/f.png')} /></a>
        <a href="https://www.instagram.com/thinksys_inc/"><img className='s_img' src={require('../../assests/i.png')} /></a>
      </div>
    </footer>
  );
};

export default Footer;