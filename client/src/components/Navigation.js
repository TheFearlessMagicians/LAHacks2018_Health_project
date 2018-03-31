import React from 'react';
import {NavLink} from 'react-router-dom';
const Header = () => (
  <div>
    <NavLink to="/" activeClassName="is-active" exact = {true}>login</NavLink>
    <NavLink to="/create" activeClassName="is-active" exact = {true}> create Challenge</NavLink>
    <NavLink to="/edit" activeClassName="is-active" exact = {true}>edit Challenge</NavLink>
    <NavLink to="/help" activeClassName="is-active" exact = {true}>help</NavLink>
    {/* We need this Link component, so that we route without GETting to the server.
    When linking internally, we need Link so that we take advantage of cheap client-side
    routing. */}
  </div>);

export default Header;
