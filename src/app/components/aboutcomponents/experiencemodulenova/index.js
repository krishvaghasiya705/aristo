"use client";
import React, { useLayoutEffect, useRef } from 'react'
import styles from "./experiencemodulenova.module.scss"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";
import Marquee from "react-fast-marquee";
import journeyimage1 from "@/assets/images/journeyimage1.webp"
import journeyimage2 from "@/assets/images/journeyimage2.webp"
import journeyimage3 from "@/assets/images/journeyimage3.webp"
import journeyimage4 from "@/assets/images/journeyimage4.webp"
import journeyimage5 from "@/assets/images/journeyimage5.webp"
import Modulenovaicon from '@/assets/icon/modulenovaicon';
import { useLanguage } from "@/app/context/LanguageContext";

export default function Experiencemodulenova() {
    const { t } = useLanguage();
    const spansRef = useRef([]);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            const spans = spansRef.current.filter(Boolean);
            
            spans.forEach((span, index) => {
                gsap.fromTo(
                    span,
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
                        scrollTrigger: {
                            trigger: span,
                            start: "top 98%",
                            end: "top 20%",
                            toggleActions: "play reverse play reverse",
                            scrub: 0.5,
                            markers: false
                        }
                    }
                );
            });
            
            const imageEffects = document.querySelectorAll(`.${styles.journeyimagedivmain}`);
            imageEffects.forEach((effect) => {
                gsap.fromTo(
                    effect,
                    {
                        height: "0%"
                    },
                    {
                        height: "100%",
                        duration: 1.2,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: effect,
                            start: "top 80%",
                            end: "top 70%",
                            scrub: 1.5,
                            toggleActions: "play none none reverse",
                            markers: false
                        }
                    }
                );
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);
    return (
        <div className={styles.experiencemodulenovamain} ref={sectionRef}>
            <div className="container">
                <div className={styles.experiencemodulenovatitle}>
                    <h2>
                        <p>
                            <span ref={(el) => (spansRef.current[0] = el)}>{t('aboutSection.experience.title.line1')}</span>
                        </p>
                        <p>
                            <span ref={(el) => (spansRef.current[1] = el)}>{t('aboutSection.experience.title.line2')}</span>
                        </p>
                        <p>
                            <span ref={(el) => (spansRef.current[2] = el)}>{t('aboutSection.experience.title.line3')}</span>
                        </p>
                        <p>
                            <span ref={(el) => (spansRef.current[3] = el)}>{t('aboutSection.experience.title.line4')}</span>
                        </p>
                    </h2>
                    <p className={styles.experiencetitleparagraph}>
                        {t('aboutSection.experience.paragraph')}
                    </p>
                </div>
                <div className={styles.experiencemodulenovajourneymain}>
                    <div className={styles.experiencemodulenovajourney}>
                        <div className={styles.journeylineflx}>
                            <div className={styles.journeycircle}></div>
                            <div className={styles.journeyline}></div>
                            <div className={styles.journeycircle}></div>
                        </div>
                        <div className={styles.journeymarquee}>
                            <Marquee speed="2000">
                                <div className={styles.journeymarqueeflx}>
                                    <div></div>
                                    <Modulenovaicon />
                                    <Modulenovaicon />
                                    <div></div>
                                </div>
                            </Marquee>
                        </div>
                        <div className={styles.journeygrd}>
                            <div className={styles.journeyimage1}>
                                <div className={styles.journeyimagedivmain}>
                                    <div className={styles.journeyimageeffect}></div>
                                    <Image src={journeyimage1} alt="journeyimage1" className={styles.journeyimage}/>
                                </div>
                            </div>
                            <div className={styles.journeyimage2}>
                                <div className={styles.journeyimagedivmain}>
                                    <div className={styles.journeyimageeffect}></div>
                                    <Image src={journeyimage2} alt="journeyimage2" className={styles.journeyimage}/>
                                </div>
                            </div>
                            <div className={styles.journeyimage3}>
                                <div className={styles.journeyimagedivmain}>
                                    <div className={styles.journeyimageeffect}></div>
                                    <Image src={journeyimage3} alt="journeyimage3" className={styles.journeyimage}/>
                                </div>
                            </div>
                            <div className={styles.journeyimage4}>
                                <div className={styles.journeyimagedivmain}>
                                    <div className={styles.journeyimageeffect}></div>
                                    <Image src={journeyimage4} alt="journeyimage4" className={styles.journeyimage}/>
                                </div>
                            </div>
                            <div className={styles.journeyimage5}>
                                <div className={styles.journeyimagedivmain}>
                                    <div className={styles.journeyimageeffect}></div>
                                    <Image src={journeyimage5} alt="journeyimage5" className={styles.journeyimage}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
