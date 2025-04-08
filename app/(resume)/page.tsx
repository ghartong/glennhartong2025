import type { Metadata } from "next";

import Header from './components/header/Header';

export const metadata: Metadata = {
  title: "Glenn Hartong",
  description: "Full Stack Developer",
};

function Resume() {
  return (
    <main>
      <Header />
      <h1>Public site</h1>
    </main>
  );
}

export default Resume;