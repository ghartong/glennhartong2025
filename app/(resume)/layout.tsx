import { Geist, Geist_Mono } from "next/font/google"

import Header from "./components/header/Header"

import "../globals.css"
import layout from './layout.module.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <div className={`${geistSans.variable} ${geistMono.variable} ${layout.body} grid`}>
        {children}
      </div>
    </main>
  );
}
