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
            href: '/reddog',
            activeSegment: null,
        },
        {
            id: 2,
            title: 'Video',
            href: '/reddog/video',
            activeSegment: 'video',
        },
        {
            id: 3,
            title: 'Public Site',
            href: '/',
            activeSegment: 'nope',
        },
    ]

    return (
        <nav className={navigation.reddog_nav}>
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