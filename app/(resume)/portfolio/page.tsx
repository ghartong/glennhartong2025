import SiteCard from './components/SiteCard'
import { sites } from './utils'

export const metadata = {
    title: "Portfolio",
}


function PortfolioPage() {
    return (
        <>
            <h2 className="font-extrabold">Portfolio</h2>
            <section className="flex flex-wrap flex-row">
                {sites.map(site => (
                    <SiteCard site={site} key={site.id} />
                ))}
            </section>
        </>
    );
}

export default PortfolioPage;