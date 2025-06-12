"use client";
import React, { useLayoutEffect, useRef } from 'react'
import styles from './explorebrandsection.module.scss'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";
import exploresectionimage1 from "@/assets/images/exploresectionimage1.jpg"
import exploresectionimage2 from "@/assets/images/exploresectionimage2.webp"
import exploresectionimage3 from "@/assets/images/exploresectionimage3.webp"
import Arrowicon from "@/assets/icon/arrowicon";
import Commonbutton from "../../commonbutton/button";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Explorebrandsection() {
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
            
            const imageEffects = document.querySelectorAll(`.${styles.exploreimage}`);
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
                            start: "top 90%",
                            end: "top 90%",
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
    <div className={styles.explorebrandsectionmain} ref={sectionRef}>
        <div className="container">
            <div className={styles.explorebrandsection}>
                <div className={styles.explorebrandsectionflx}>
                    <div className={styles.exploreimagemain}>
                        <div className={styles.exploreimage}>
                            <Image src={exploresectionimage1} alt="exploresectionimage1" />
                        </div>
                    </div>
                    <div className={styles.explorebrandscontent}>
                        <h4>
                            <span ref={(el) => (spansRef.current[0] = el)}>{t('aboutSection.explore.design.title')}</span>
                        </h4>
                        <p>{t('aboutSection.explore.design.paragraph')}</p>
                    </div>
                </div>
            </div>
            <div className={styles.explorebrandsection}>
                <div className={styles.explorebrandsectionflx}>
                    <div className={styles.explorebrandscontent}>
                        <h4>
                            <span ref={(el) => (spansRef.current[1] = el)}>{t('aboutSection.explore.delivery.title')}</span>
                        </h4>
                        <p>{t('aboutSection.explore.delivery.paragraph')}</p>
                    </div>
                    <div className={styles.exploreimagemain}>
                        <div className={styles.exploreimage}>
                            <Image src={exploresectionimage2} alt="exploresectionimage2" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.explorebrandsection}>
                <div className={styles.explorebrandsectionflx}>
                    <div className={styles.exploreimagemain}>
                        <div className={styles.exploreimage}>
                            <Image src={exploresectionimage3} alt="exploresectionimage3" />
                        </div>
                    </div>
                    <div className={styles.explorebrandscontent}>
                        <h4>
                            <span ref={(el) => (spansRef.current[2] = el)}>{t('aboutSection.explore.assembly.title')}</span>
                        </h4>
                        <p>{t('aboutSection.explore.assembly.paragraph')}</p>
                    </div>
                </div>
                <Commonbutton Buttonlink="/brands?category=all" Buttontext={t('exclusiveBrands.button')} ButtonIcon={<Arrowicon />} />
            </div>
        </div>
    </div>
  )
}
