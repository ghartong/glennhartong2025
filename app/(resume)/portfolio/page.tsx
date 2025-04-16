import SiteCard from './components/SiteCard'
import { sites } from './utils'

export const metadata = {
    title: "Portfolio",
}


function PortfolioPage() {
    return (
        <>
            <h1 className="font-extrabold">Portfolio</h1>
            <section className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sites.map(site => (
                    <SiteCard site={site} key={site.id} />
                ))}
            </section>
        </>
    );
}

export default PortfolioPage;