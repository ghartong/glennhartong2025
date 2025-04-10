import { redirect } from 'next/navigation';
// import Link from 'next/link';

// export const metadata = {
//     title: "Repair Shop Project"
// }

function RsHomePage() {
    redirect("/repairshop/tickets")
    // return (
    //     <div className="text-center mx-auto">
    //         <div className="rounded-xl bg-black/90 text-white">
    //             <h1 className="text-4xl font-bold">Dan&apos;s Computer<br />Repair Shop</h1>
    //             <address>
    //                 555 Gateway Lane<br />
    //                 Kansas City, KS 55555
    //             </address>
    //             <p>Open Daily: 9am to 5pm</p>
    //             <Link href="tel:5555555555" className="hover:underline">
    //                 555-555-5555
    //             </Link>
    //         </div>
    //     </div>
    // );
}

export default RsHomePage;