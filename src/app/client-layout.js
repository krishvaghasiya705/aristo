"use client"
import Footer from "./common/footer";
import Header from "./common/header";
import Cursor from "./components/cursor/cursor";
import LenisScroll from "./components/scroll/lenisscroll";
import "./globals.scss";
import "./font.scss"
import "../styles/styles.scss";
import { useState, useEffect } from "react";
import gsap from "gsap";

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMenuState = (e) => {
      if (e.detail) {
        setIsMenuOpen(e.detail);
      }
    };

    window.addEventListener('menuStateChange', handleMenuState);
    return () => window.removeEventListener('menuStateChange', handleMenuState);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to('main', {
        duration: 0.6,
        ease: "power2.inOut",
        paddingTop: '100vh'
      });
    } else {
      gsap.to('main', {
        duration: 0.6,
        ease: "power2.inOut",
        paddingTop: '0'
      });
    }
  }, [isMenuOpen]);

  return (
    <html lang="en">
      <head>
        <link href="./favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Cursor />
        <LenisScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
