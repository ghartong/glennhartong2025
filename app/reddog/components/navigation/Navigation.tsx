'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

import navigation from './navigation.module.css'

function Navigation() {
    const activeSegment = useSelectedLayoutSegment()
    const links = [
        {
            id: 1,
            title: 'Home',
            href: '/reddog',
            activeSegment: null,
        },
        {
            id: 2,
            title: 'Leadership',
            href: '/reddog/leaderships',
            activeSegment: 'leaderships',
        },
        {
            id: 3,
            title: 'Employers',
            href: '/reddog/employers',
            activeSegment: 'employers',
        },
        {
            id: 4,
            title: 'Credentials',
            href: '/reddog/credentials',
            activeSegment: 'credentials',
        },
        {
            id: 5,
            title: 'Public Site',
            href: '/',
            activeSegment: 'nope',
        },
    ]

    return (
        <nav className={navigation.reddog_nav}>
            <ul className={navigation.reddog_navUl}>
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
                <li key="login">
                    <LogoutLink>
                        Logout
                    </LogoutLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;