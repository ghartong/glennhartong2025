'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation';

import navigation from './navigation.module.css'

function Navigation() {
    const activeSegment = useSelectedLayoutSegment()
    const links = [
        {
            id: 1,
            title: 'Home',
            href: '/',
            activeSegment: null,
        },
        {
            id: 2,
            title: 'Experience',
            href: '/experience',
            activeSegment: 'experience',
        },
        {
            id: 3,
            title: 'Highlights',
            href: '/highlights',
            activeSegment: 'highlights',
        },
        {
            id: 4,
            title: 'Credentials',
            href: '/credentials',
            activeSegment: 'credentials',
        },
        {
            id: 5,
            title: 'Portfolio',
            href: '/portfolio',
            activeSegment: 'portfolio',
        },

        {
            id: 6,
            title: 'Private Site',
            href: '/reddog',
            activeSegment: 'nope',
        },
    ]

    return (
        <nav className={navigation.nav}>
            <ul>
                {links.map((item) => (
                    <li
                        key={item.id}
                        className={activeSegment === item.activeSegment ? navigation.selected : ''}
                    >
                        <Link href={item.href}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;