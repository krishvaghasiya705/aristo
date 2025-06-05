"use client";
import React from "react";
import styles from "./footer.module.scss";
import Footerlogo from "@/assets/icon/footerlogo";
import Link from "next/link";
import Uparrowcircle from "@/assets/icon/uparrowcircle";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footermain}>
      <div className="container">
        <div className={styles.footer}>
          {/* Logo */}
          <div className={styles.footerlogo}>
            <Link href={"/"}>
              <div>
                <Footerlogo />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className={styles.footercontentmain}>
            {[
              { path: "/", label: "home" },
              { path: "/about", label: "about" },
              { path: "/brands", label: "brands" },
              { path: "/contact", label: "contact" },
              { path: "/", label: "catalog" }
            ].map((item) => (
              <Link href={item.path} key={item.label}>
                <span>{t(`header.navigation.${item.label}`)}</span>
                <span>{t(`header.navigation.${item.label}`)}</span>
              </Link>
            ))}
          </div>

          {/* Up arrow and copyright */}
          <div className={styles.footerright}>
            <div
              className={styles.uparrowmain}
              onClick={handleClick}
              data-cursor-hover
            >
              <div className={styles.uparrow}>
                <Uparrowcircle />
              </div>
            </div>
            <p>
              <span className={styles.copyrightline}>
                <span>ARISTO® 2025</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
