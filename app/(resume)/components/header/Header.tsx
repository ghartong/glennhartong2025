"use client";

import Link from 'next/link';

import Logo from '../logo/Logo';
import Navigation from '../navigation/Navigation';
import Animation from './Animation';

import header from './header.module.css';

function Header() {
  return (
    <header className={header.header}>
      <section className={header.wrapper}>
        <Link href="/" aria-label="Jump to the home page">
          <Logo />
        </Link>
        <h2 className={header.sitename}>Glenn Hartong</h2>
        <Animation />
      </section>
      <Navigation />
    </header>
  );
}

export default Header;