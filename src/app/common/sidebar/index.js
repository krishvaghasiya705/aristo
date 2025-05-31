"use client";
import React, { useEffect } from "react";
import styles from "./sidebar.module.scss";
import Link from "next/link";
import gsap from "gsap";

export default function Sidebar({ isOpen }) {
  useEffect(() => {
    if (isOpen) {
      gsap.to(`.${styles.sidebarmain}`, {
        duration: 0.6,
        ease: "power3.out",
        y: 0,
        opacity: 1,
        visibility: "visible",
        onComplete: () => {
          gsap.to(`.${styles.sidebarflx}`, {
            duration: 0.6,
            ease: "power3.out",
            y: 0,
            opacity: 1,
            onComplete: () => {
              gsap.fromTo(
                `.${styles.sidebarlinkmain} a`,
                {
                  rotation: 8,
                  translateY: "80%",
                  force3D: true,
                },
                {
                  duration: 0.35,
                  ease: "power3.out",
                  rotation: 0,
                  translateY: 0,
                  delay: 0.1,
                  stagger: 0,
                  clearProps: "all",
                  overwrite: "auto"
                }
              );
            },
          });
        },
      });
    } else {
      gsap.to(`.${styles.sidebarlinkmain} a`, {
        duration: 0.2,
        ease: "power3.in",
        opacity: 0,
        delay: 0
      });
      gsap.to(`.${styles.sidebarflx}`, {
        duration: 0.6,
        ease: "power3.in",
        y: 20,
        opacity: 0,
        delay: 0.1
      });
      gsap.to(`.${styles.sidebarmain}`, {
        duration: 0.6,
        ease: "power3.in",
        y: "-100%",
        opacity: 0,
        visibility: "hidden",
        delay: 0.15
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className={styles.sidebarmain}>
        <div className="container">
          <div className={styles.sidebarflx}>
            <div className={styles.sidebarlinkmain}>
              <Link href={"/"}>home</Link>
              <Link href={"/"}>home</Link>
            </div>
            <div className={styles.sidebarlinkmain}>
              <Link href={"/"}>about</Link>
              <Link href={"/"}>about</Link>
            </div>
            <div className={styles.sidebarlinkmain}>
              <Link href={"/"}>brands</Link>
              <Link href={"/"}>brands</Link>
            </div>
            <div className={styles.sidebarlinkmain}>
              <Link href={"/"}>contact</Link>
              <Link href={"/"}>contact</Link>
            </div>
            <div className={styles.catalogbuttonmain}>
              <Link href={"/"}>
                <button type="button" className={styles.catalogbutton}>
                  catalog
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
