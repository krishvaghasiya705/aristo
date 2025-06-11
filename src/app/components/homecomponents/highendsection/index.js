"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./highendsection.module.scss";
import Arrowicon from "@/assets/icon/arrowicon";
import Commonbutton from "../../commonbutton/button";
import Link from "next/link";
import highendsectionimage1 from "@/assets/images/highendsectionimage1.png"
import highendsectionimage2 from "@/assets/images/highendsectionimage2.png"
import highendsectionimage3 from "@/assets/images/highendsectionimage3.png"
import highendsectionimage4 from "@/assets/images/highendsectionimage4.png"
import highendsectionimage5 from "@/assets/images/highendsectionimage5.png"
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Highendsection() {
  const sectionRef = useRef(null);
  const spansRef = useRef([]);
  const paragraphspansRef = useRef([]);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    const spans = spansRef.current.filter(Boolean);
    const paraspans = paragraphspansRef.current.filter(Boolean);

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
        stagger: {
          amount: 1.5,
          from: "start"
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(
      paraspans,
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
        stagger: {
          amount: 1.5,
          from: "start"
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 25%",
          end: "top 30%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );

    const imageEffects = [
      styles.highendsectionimage1effect,
      styles.highendsectionimage2effect,
      styles.highendsectionimage3effect,
      styles.highendsectionimage4effect,
      styles.highendsectionimage5effect
    ];

    imageEffects.forEach((effectClass, index) => {
      const effect = document.querySelector(`.${effectClass}`);
      if (effect) {
        gsap.fromTo(
          effect,
          {
            height: "100%"
          },
          {
            height: "0%",
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: effect,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    const images = [
      styles.highendsectionimage1,
      styles.highendsectionimage2,
      styles.highendsectionimage3,
      styles.highendsectionimage4,
      styles.highendsectionimage5
    ];

    images.forEach((imageClass, index) => {
      const image = document.querySelector(`.${imageClass}`);
      if (image) {
        gsap.fromTo(
          image,
          {
            scale: 1.2,
          },
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: image,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.highendsectionmain}>
      <div className="container">
        <div className={styles.highendsection}>
          <div className={styles.highendsectiontitleflx}>
            <div className={styles.highendsectiontitleflxleft}>
              <h2>
                <p>
                  <span ref={(el) => (spansRef.current[0] = el)}>{t('highEndSection.title.line1')}</span>
                </p>
                <p>
                  <span ref={(el) => (spansRef.current[1] = el)}>{t('highEndSection.title.line2')}</span>
                </p>
                <p>
                  <span ref={(el) => (spansRef.current[2] = el)}>{t('highEndSection.title.line3')}</span>
                </p>
                <p>
                  <span ref={(el) => (spansRef.current[3] = el)}>{t('highEndSection.title.line4')}</span>
                </p>
              </h2>
            </div>
            <div className={styles.highendsectiontitleflxright}>
              <h3 className={styles.aristogrouptitle}>
                <span ref={(el) => (paragraphspansRef.current[0] = el)}>
                  {t('highEndSection.content.title')}
                </span>
              </h3>
              <p>
                {t('highEndSection.content.paragraph').map((text, index) => (
                  <span key={index} className={styles.aristogroupparagraph}>
                    <span ref={(el) => (paragraphspansRef.current[index + 1] = el)}>
                      {text}
                    </span>
                  </span>
                ))}
              </p>
              <Commonbutton Buttonlink="/" Buttontext={t('highEndSection.content.button')} ButtonIcon={<Arrowicon />} />
            </div>
          </div>
        </div>
        <div className={styles.highendsectionimagesflxmain}>
          <div className={styles.highendsectionimagesflxleft}>
            <div className={styles.highendsectionimage1main}>
              <div className={styles.highendsectionimage1effect}></div>
              <Image src={highendsectionimage1} alt="highendsectionimage1" className={styles.highendsectionimage1}/>
            </div>
            <div className={styles.highendsectionimage2main}>
              <div className={styles.highendsectionimage2effect}></div>
              <Image src={highendsectionimage2} alt="highendsectionimage2" className={styles.highendsectionimage2}/>
            </div>
            <div className={styles.highendsectionimage3main}>
              <div className={styles.highendsectionimage3effect}></div>
              <Image src={highendsectionimage3} alt="highendsectionimage3" className={styles.highendsectionimage3}/>
            </div>
          </div>
          <div className={styles.highendsectionimagesflxright}>
            <div className={styles.highendsectionimage4main}>
              <div className={styles.highendsectionimage4effect}></div>
              <Image src={highendsectionimage4} alt="highendsectionimage4" className={styles.highendsectionimage4}/>
            </div>
            <div className={styles.highendsectionimage5main}>
              <div className={styles.highendsectionimage5effect}></div>
              <Image src={highendsectionimage5} alt="highendsectionimage5" className={styles.highendsectionimage5}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
