import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/navbar";
import "slick-carousel/slick/slick.css";
import PageButton from "../components/pageButton";
import Footer from "../components/Footer";
import Layout from "../components/Layout";


export const metadata: Metadata = {
  title: "Adcommerece",
  description: "Where your need is our priority",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=''>
        <Layout>
        <Navbar/>
        <PageButton/>
        {children}
        <Footer/>
        </Layout>
        </body>
    </html>
  );
}
