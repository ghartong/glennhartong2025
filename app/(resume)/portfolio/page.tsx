import SiteCard from './components/SiteCard'
import { sites } from './utils'

export const metadata = {
    title: "Portfolio",
}


function PortfolioPage() {
    return (
        <>
            <h1 className="font-extrabold">Portfolio</h1>
            <section className="flex flex-wrap flex-row">
                {sites.map(site => (
                    <SiteCard site={site} key={site.id} />
                ))}
            </section>
        </>
    );
}

export default PortfolioPage;