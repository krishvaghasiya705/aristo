"use client";
import React, { useLayoutEffect, useRef } from 'react'
import styles from "./aboutherobanner.module.scss"
import gsap from 'gsap';
import { useLanguage } from "@/app/context/LanguageContext";

export default function Aboutherobanner() {
  const { t } = useLanguage();
  const spansRef = useRef([]);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const spans = spansRef.current.filter(Boolean);
      gsap.fromTo(
        spans,
        {
          y: 100,
          rotation: 5,
          transformOrigin: "left bottom",
          opacity: 0
        },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <div className={styles.aboutherobannermain} ref={sectionRef}>
      <div className="container">
        <div className={styles.aboutherobanner}>
          <div></div>
          <div className={styles.aboutherobannertitle}>
            <h1>
              <p>
                <span ref={(el) => (spansRef.current[0] = el)}>
                  360°
                </span>
              </p>
              <p>
                <span ref={(el) => (spansRef.current[1] = el)}>APPROCH</span>
              </p>
            </h1>
          </div>
          <div className={styles.scrolldown} data-cursor-hover onClick={() => window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })}>
            <p>
              <span ref={(el) => (spansRef.current[2] = el)}>{t('heroBanner.scrollDown')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
