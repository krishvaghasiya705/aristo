"use client"
import React, { useState, useEffect } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Logo from "@/assets/icon/logo";
import Menuicon from "@/assets/icon/menuicon";
import Sidebar from "../sidebar";
import gsap from "gsap";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          gsap.to(`.${styles.header}`, {
            duration: 0.2,
            ease: "cubic-bezier(0.4, 0, 0.2, 1)",
            y: "-105%",
            overwrite: true
          });
        } else {
          // Scrolling up
          gsap.to(`.${styles.header}`, {
            duration: 0.2,
            ease: "cubic-bezier(0.4, 0, 0.2, 1)",
            y: "0%",
            overwrite: true
          });
        }
      } else {
        // At the top of the page
        gsap.to(`.${styles.header}`, {
          duration: 0.2,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          y: "0%",
          overwrite: true
        });
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(`.${styles.headerlogo}`, {
        duration: 0.3,
        ease: "power2.inOut",
        className: `${styles.headerlogo}`
      });
      gsap.to(`.${styles.headerlinksflx}`, {
        duration: 0.3,
        ease: "power2.inOut",
        className: `${styles.headerlinksflx} ${styles.headerlinksflxactive}`
      });
      gsap.to(`.${styles.menuiconmain}`, {
        duration: 0.3,
        ease: "power2.inOut",
        className: `${styles.menuiconmain}`
      });
      gsap.to(`.${styles.sidebarmain}`, {
        duration: 0.6,
        ease: "power2.inOut",
        y: 0,
        opacity: 1,
        visibility: "visible"
      });
      gsap.to(`.${styles.sidebarlinkmain}`, {
        duration: 0.4,
        ease: "power2.out",
        rotation: 0,
        stagger: 0.1,
        opacity: 1
      });
    } else {
      gsap.to(`.${styles.headerlogo}`, {
        duration: 0.3,
        ease: "power2.inOut",
        className: styles.headerlogo
      });
      gsap.to(`.${styles.headerlinksflx}`, {
        duration: 0.3,
        ease: "power2.inOut",
        className: styles.headerlinksflx
      });
      gsap.to(`.${styles.menuiconmain}`, {
        duration: 0.3,
        ease: "power2.inOut",
        className: styles.menuiconmain
      });
      gsap.to(`.${styles.sidebarmain}`, {
        duration: 0.6,
        ease: "power2.inOut",
        y: "-100%",
        opacity: 0,
        visibility: "hidden"
      });
      gsap.to(`.${styles.sidebarlinkmain}`, {
        duration: 0.4,
        ease: "power2.in",
        rotation: 10,
        stagger: 0.1,
        opacity: 0
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    // Dispatch custom event with the new menu state
    window.dispatchEvent(new CustomEvent('menuStateChange', { detail: newMenuState }));
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerflx}>
            <Link href={"/"}>
              <div className={styles.headerlogo}>
                <Logo />
              </div>
            </Link>
            <div className={styles.headerlinksflxmain}>
              <div className={styles.headerlinksflx}>
                <div className={styles.headelinkbox}>
                  <Link href={"/"}>{t('header.navigation.home')}</Link>
                  <Link href={"/"}>{t('header.navigation.home')}</Link>
                </div>
                <div className={styles.headelinkbox}>
                  <Link href={"/about"}>{t('header.navigation.about')}</Link>
                  <Link href={"/about"}>{t('header.navigation.about')}</Link>
                </div>
                <div className={styles.headelinkbox}>
                  <Link href={"/brands"}>{t('header.navigation.brands')}</Link>
                  <Link href={"/brands"}>{t('header.navigation.brands')}</Link>
                </div>
                <div className={styles.headelinkbox}>
                  <Link href={"/contact"}>{t('header.navigation.contact')}</Link>
                  <Link href={"/contact"}>{t('header.navigation.contact')}</Link>
                </div>
                <div className={styles.catalogbuttonmain}>
                  <Link href={"/"}>
                    <button type="button" className={styles.catalogbutton}>{t('header.navigation.catalog')}</button>
                  </Link>
                </div>
              </div>
              <div className={styles.menuiconmain} onClick={toggleMenu} data-cursor-hover>
                <div className={styles.menuicon}>
                  <Menuicon />
                </div>
                <div className={styles.menuicon}>
                  <Menuicon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isMenuOpen} />
    </>
  );
}
