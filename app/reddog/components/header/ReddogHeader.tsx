"use client";

import ReddogLogo from '../logo/ReddogLogo';
import Navigation from '../navigation/Navigation';
import header from './header.module.css'

console.log('running in client: ReddogHeader')

function ReddogHeader() {
    return (
      <header>
        <ReddogLogo />
        <h1 className={header.red} data-id="reddog-h1">Reddog</h1>
        <Navigation />
      </header>
    );
  }

export default ReddogHeader;