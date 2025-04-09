import Link from 'next/link';

import Header from './components/Header';
import layout from './layout.module.css';

export default function RSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full mx-0">
      <Link href="/portfolio" className={layout.title}>Back to Portfolio</Link>
      <div className="mx-auto w-full max-w-7xl">
        <Header />
        <div className="px-4 py-4 w-90">
          {children}
        </div>
      </div>
    </div>
  );
}
