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
      if (e.detail !== undefined) {
        setIsMenuOpen(e.detail);
      }
    };

    window.addEventListener('menuStateChange', handleMenuState);
    return () => window.removeEventListener('menuStateChange', handleMenuState);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;

      gsap.to('.blankspace', {
        duration: 0.6,
        ease: "power2.inOut",
        height: '100vh',
        overwrite: true
      });
    } else {
      // Unlock scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);

      gsap.to('.blankspace', {
        duration: 1.6,
        ease: "power2.inOut",
        height: '0vh',
        overwrite: true
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
          <div className="blankspace"></div>
          {children}
        <Footer />
      </body>
    </html>
  );
}
