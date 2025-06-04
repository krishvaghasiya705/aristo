import React, { useEffect, useRef } from 'react';
import styles from "./footer.module.scss";
import Footerlogo from '@/assets/icon/footerlogo';
import Link from "next/link";
import Uparrowcircle from '@/assets/icon/uparrowcircle';
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef(null);
  const footerElementsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      footerElementsRef.current,
      {
        y: 100,
        rotation: 5,
        transformOrigin: "left bottom",
        opacity: 0,
      },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
        stagger: {
          amount: 1,
          from: "start",
        },
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "play none none reverse",
          markers: false,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footermain} ref={footerRef}>
      <div className="container">
        <div className={styles.footer}>
          <div className={styles.footerlogo}>
            <Link href={"/"}>
              <div ref={el => footerElementsRef.current[0] = el}>
                <Footerlogo />
              </div>
            </Link>
          </div>

          <div className={styles.footercontentmain}>
            {['home', 'about', 'brands', 'contact', 'catalog'].map((item, index) => (
              <Link href={"/"} key={item}>
                <span ref={el => footerElementsRef.current[1 + index * 2] = el}>{t(`header.navigation.${item}`)}</span>
                <span ref={el => footerElementsRef.current[2 + index * 2] = el}>{t(`header.navigation.${item}`)}</span>
              </Link>
            ))}
          </div>

          <div className={styles.footerright}>
            <div className={styles.uparrowmain} onClick={handleClick} data-cursor-hover>
              <div
                className={styles.uparrow}
                ref={el => footerElementsRef.current[11] = el}
              >
                <Uparrowcircle />
              </div>
            </div>
            <p>
              <span className={styles.copyrightline}>
                <span ref={el => footerElementsRef.current[12] = el}>ARISTO® 2025</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
