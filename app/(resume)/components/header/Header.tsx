"use client";

import Logo from '../logo/Logo'
import Navigation from '../navigation/Navigation'
import header from './header.module.css'

console.log('running in client: Header')

function Header() {
    return (
      <header>
        <Logo />
        <h1 className={header.red} data-id="reddog-h1">Glenn Hartong</h1>
        <Navigation />
      </header>
    );
  }

export default Header;