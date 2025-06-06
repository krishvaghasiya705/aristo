"use client"
import React, { useEffect, useRef } from "react";
import styles from "./homeherobanner.module.scss";
import homeherobannerimages1 from "@/assets/images/homeherobannerimages1.png";
import homeherobannerimages2 from "@/assets/images/homeherobannerimages2.png";
import homeherobannerimages3 from "@/assets/images/homeherobannerimages3.png";
import homeherobannerimages4 from "@/assets/images/homeherobannerimages4.png";
import homeherobannerimages5 from "@/assets/images/homeherobannerimages5.png";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Homeherobanner() {
  const sectionRef = useRef(null);
  const bannerRef = useRef(null);
  const imagesRef = useRef([]);
  const titleRefs = useRef([]);
  const { t } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(bannerRef.current, {
        opacity: 1,
        transformOrigin: "center center",
        force3D: true,
      });

      const images = imagesRef.current;
      gsap.set(images, {
        y: "100vh",
        rotation: 0,
        opacity: 0,
      });

      const masterTl = gsap.timeline({ repeat: -1 });

      images.forEach((image) => {
        masterTl
          .to(image, {
            y: "0",
            rotation: 360,
            opacity: 1,
            duration: 1.8,
            ease: "cubic-bezier(0.77, 0, 0.175, 1)",
            onUpdate: function () {
              if (this.progress() === 1) gsap.set(image, { rotation: 0 });
            },
          })
          .to({}, { duration: 0.5 })
          .to(image, {
            y: "-100vh",
            rotation: "+=360",
            opacity: 0,
            duration: 1.8,
            ease: "cubic-bezier(0.77, 0, 0.175, 1)",
            onUpdate: function () {
              if (this.progress() === 1) gsap.set(image, { rotation: 0 });
            },
          }, "+=0.5");
      });

      gsap.set(titleRefs.current, {
        y: 146,
      });

      gsap.to(titleRefs.current, {
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }, sectionRef.current);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className={styles.homeherobannermain} ref={sectionRef}>
        <div className="container">
          <div className={styles.homeherobanner} ref={bannerRef}>
            <div className={styles.homeherobannerimagesmain}>
              <div className={styles.homeherobannerimages}>
                <Image 
                  ref={el => imagesRef.current[0] = el}
                  src={homeherobannerimages1} 
                  alt="homeherobannerimages1" 
                />
                <Image 
                  ref={el => imagesRef.current[1] = el}
                  src={homeherobannerimages2} 
                  alt="homeherobannerimages2" 
                />
                <Image 
                  ref={el => imagesRef.current[2] = el}
                  src={homeherobannerimages3} 
                  alt="homeherobannerimages3" 
                />
                <Image 
                  ref={el => imagesRef.current[3] = el}
                  src={homeherobannerimages4} 
                  alt="homeherobannerimages4" 
                />
                <Image 
                  ref={el => imagesRef.current[4] = el}
                  src={homeherobannerimages5} 
                  alt="homeherobannerimages5" 
                />
              </div>
            </div>
            <div></div>
            <div className={styles.homeherobannertitle}>
              <h1>
                <p>
                  <span ref={el => titleRefs.current[0] = el}>{t('heroBanner.titlel1')}</span>
                </p>
                <p>
                  <span ref={el => titleRefs.current[1] = el}>{t('heroBanner.titlel2')}</span>
                </p>
              </h1>
            </div>
            <div className={styles.scrolldown} data-cursor-hover onClick={() => window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              })}>
              <p>{t('heroBanner.scrollDown')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
