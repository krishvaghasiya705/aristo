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

export default function RooLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      document.body.style.backgroundColor = 'var(--black)';
    } else if (pathname === '/about') {
      document.body.style.backgroundColor = 'var(--black)';
    } else if (pathname === '/brands') {
      document.body.style.backgroundColor = 'var(--white)';
    } else {
      document.body.style.backgroundColor = 'var(--black)';
    }
  }, [pathname]);

  useEffect(() => {
    const handleMenuState = (e) => {
      if (e.detail !== undefined) {
        setIsMenuOpen(e.detail);
      }
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
          content="Aristo group was established in 1992 with the inspiration of offering better products for homeowners in Israel. The group&#x27;s basic philosophical concept is a holistic approach, which produces quality solutions, with an exceptional design statement, which differentiates each and every project, and produces individual solutions, which are different from each other."
          name="description"
        />
        <meta content="Aristo® - Living Experience" property="og:title" />
        <meta
          content="Aristo group was established in 1992 with the inspiration of offering better products for homeowners in Israel. The group&#x27;s basic philosophical concept is a holistic approach, which produces quality solutions, with an exceptional design statement, which differentiates each and every project, and produces individual solutions, which are different from each other."
          property="og:description"
        />
        <meta
          content="https://cdn.prod.website-files.com/66b9ff332e5bba96a4fd7fea/675832526aa272ab7d9516ef_1200x630%20(1).png"
          property="og:image"
        />
        <meta content="Aristo® - Living Experience" property="twitter:title" />
        <meta
          content="Aristo group was established in 1992 with the inspiration of offering better products for homeowners in Israel. The group&#x27;s basic philosophical concept is a holistic approach, which produces quality solutions, with an exceptional design statement, which differentiates each and every project, and produces individual solutions, which are different from each other."
          property="twitter:description"
        />
      </head>
      <body>
        {loading ? (
          <Loading />
        ) : (
          <>
            <LanguageProvider>
              <Cursor />
              <LenisScroll />
              <Header />
              <div className="blankspace"></div>
              {children}
              <LanguageSwitcher />
              <Footer />
            </LanguageProvider>
          </>
        )}
      </body>
    </html>
  );
}
