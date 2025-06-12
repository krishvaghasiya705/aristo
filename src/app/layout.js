"use client";
import { usePathname } from "next/navigation";
import "./globals.scss";
import "./font.scss";
import "../styles/styles.scss";
import { useState, useEffect } from "react";
import gsap from "gsap";
import Loading from "./loading";
import { LanguageProvider } from "./context/LanguageContext";
import Cursor from "./components/cursor/cursor";
import LenisScroll from "./components/scroll/lenisscroll";
import Header from "./common/header";
import Footer from "./common/footer";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const isCatalogCardPage = pathname.startsWith('/catalog/') && pathname !== '/catalog';
  const isBrandsPage = pathname === '/brands' || pathname.startsWith('/brands?');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleRouteChange = () => setLoading(true);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    if (pathname === '/brands' || pathname.startsWith('/brands/') || pathname === '/catalog' || pathname.startsWith('/catalog/')) {
      document.body.style.backgroundColor = 'var(--white)';
    } else {
      document.body.style.backgroundColor = 'var(--black)';
    } if (pathname === '/about') {
      document.body.style.backgroundColor = 'var(--darkgrey)';
    }
  }, [pathname]);

  useEffect(() => {
    const handleMenuState = (e) => {
      if (e.detail !== undefined) setIsMenuOpen(e.detail);
    };
    window.addEventListener("menuStateChange", handleMenuState);
    return () => window.removeEventListener("menuStateChange", handleMenuState);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;

      gsap.to(".blankspace", {
        duration: 0.6,
        ease: "power2.inOut",
        height: "100vh",
        overwrite: true,
      });
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);

      gsap.to(".blankspace", {
        duration: 1.6,
        ease: "power2.inOut",
        height: "0vh",
        overwrite: true,
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
        <meta charSet="utf-8" />
        <title>Aristo® - Living Experience</title>
        <meta
          name="description"
          content="Aristo group was established in 1992..."
        />
        <meta property="og:title" content="Aristo® - Living Experience" />
        <meta
          property="og:description"
          content="Aristo group was established in 1992..."
        />
        <meta
          property="og:image"
          content="https://cdn.prod.website-files.com/66b9ff332e5bba96a4fd7fea/675832526aa272ab7d9516ef_1200x630%20(1).png"
        />
        <meta property="twitter:title" content="Aristo® - Living Experience" />
        <meta
          property="twitter:description"
          content="Aristo group was established in 1992..."
        />
      </head>
      <body>
        {loading ? (
          <Loading />
        ) : (
          <main>
            <LanguageProvider>
              <Cursor />
              <LenisScroll />
              <Header hideLogo={isCatalogCardPage} scrollstop={isCatalogCardPage || isBrandsPage} />
              <div className="blankspace"></div>
              {children}
              <LanguageSwitcher />
              {!isCatalogCardPage && !isBrandsPage && <Footer />}
            </LanguageProvider>
          </main>
        )}
      </body>
    </html>
  );
}
