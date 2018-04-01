import React from 'react';
import {NavLink} from 'react-router-dom';
import Navigation from './Navigation';
const Header = (props) => (
    <div>
  <header>
    <h1 className="header"> goliath.io</h1>
  </header>
  <Navigation/>
  </div>
);

export default Header;
