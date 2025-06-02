"use client";
import React, { useEffect, useRef } from "react";
import styles from "./homebuttonsection.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Homebuttonsection() {
  const sectionRef = useRef(null);
  const buttonsRef = useRef([]);
  const buttonTextsRef = useRef([]);
  const { t } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate buttons
    gsap.fromTo(
      buttonsRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "play none none reverse"
        },
      }
    );

    // Animate button text with delay
    gsap.fromTo(
      buttonTextsRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "play none none reverse"
        },
      }
    );
  }, []);

  const categories = [
    'kitchens',
    'furniture',
    'appliances',
    'closets',
    'bathrooms',
    'sound',
    'surfaces',
    'decoration',
    'art',
    'lighting',
    'carpets',
    'faucets',
    'outdoor'
  ];

  return (
    <>
      <div className={styles.homebuttonsectionmain} ref={sectionRef}>
        <div className="container">
          <div className={styles.homebuttonsection}>
            <div className={styles.homebuttonsectionflx}>
              {categories.map((category, index) => (
                <div key={category} className={styles.homebuttonmain} ref={el => buttonsRef.current[index] = el}>
                  <button type="button" className={styles.homebutton} data-cursor-hover>
                    <div className={styles.homebuttontext} ref={el => buttonTextsRef.current[index] = el}>
                      <span>{t(`buttonSection.categories.${category}`)}</span>
                      <span>{t(`buttonSection.categories.${category}`)}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
