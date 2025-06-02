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
        <title>Aristo Group</title>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Aristo Group - Your trusted partner in business solutions"
        />
        <meta name="keywords" content="Aristo Group " />
        <meta name="author" content="Aristo Group" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
