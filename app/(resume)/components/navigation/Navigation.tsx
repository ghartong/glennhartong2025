import Link from 'next/link';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/reddog'}>Private Site</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;