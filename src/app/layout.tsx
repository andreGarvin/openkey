import "src/app/globals.css";

import style from "styled-components";
import { Metadata } from "next";

import Head from 'next/head';


export const metadata: Metadata = {
  title: {
    default: "openkey",
    template: "%s | OpenKey",
  },
  description: "yet another url shortener, but with a fun twist",
  openGraph: {
    type: "website",
    title: "openkey",
    locale: "en-US",
    siteName: "openkey",
    description: "openkey",
  },
  icons: {
    icon: "/favicon.png"
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
