import Link from 'next/link';

export const metadata = {
    title: "Portfolio",
}

function PortfolioPage() {
    return (
        <>
            <h2>Portfolio</h2>
            <ul>
                <li><Link href="/repairshop">Computer Repair Shop</Link></li>
            </ul>
        </>
    );
}

export default PortfolioPage;