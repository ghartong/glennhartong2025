import Link from 'next/link';

import layout from './layout.module.css'

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="animation-slide w-full">
        {children}
      </div>
    </main>
  );
}
