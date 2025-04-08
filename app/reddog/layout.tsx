import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import ReddogHeader from "./components/header/ReddogHeader"

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

export const metadata: Metadata = {
  title: "Reddog",
  description: "stuff for me, not for you",
};

export default function ReddogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <ReddogHeader />
      <div className={`${geistSans.variable} ${geistMono.variable} ${layout.body}`}>
        {children}
      </div>
    </main>
  );
}
