"use client";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './exclusivebrands.module.scss'
import Meridiani from "@/assets/icon/meridiani";
import Frigerio from "@/assets/icon/frigerio";
import Fiam from "@/assets/icon/fiam";
import Sangiacomo from "@/assets/icon/sangiacomo";
import Modulnova from "@/assets/icon/modulnova";
import Hansgrohe from "@/assets/icon/hansgrohe";
import Devidegroopi from "@/assets/icon/devidegroopi";
import Sachi from "@/assets/icon/sachi";
import Laminam from "@/assets/icon/laminam";
import Dekton from "@/assets/icon/dekton";
import Arrowicon from "@/assets/icon/arrowicon";
import Commonbutton from "../../commonbutton/button";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Exclusivebrands() {
    const sectionRef = useRef(null);
    const spansRef = useRef([]);
    const cardsRef = useRef([]);
    const titleRef = useRef(null);
    const { t } = useLanguage();

    // Initialize GSAP animations
    useEffect(() => {
        const refreshScrollTrigger = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('load', refreshScrollTrigger);
        const timeoutId = setTimeout(refreshScrollTrigger, 1000);

        return () => {
            window.removeEventListener('load', refreshScrollTrigger);
            clearTimeout(timeoutId);
        };
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
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
                    stagger: {
                        amount: 1.5,
                        from: "start"
                    },
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                        toggleActions: "play none none reverse",
                        markers: false
                    }
                }
            );

            // Cards stacking animation
            const cards = cardsRef.current.filter(Boolean);
            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    {
                        y: 200,
                        opacity: 0,
                        scale: 0.9,
                        zIndex: -index
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        zIndex: 0,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=50",
                            end: "top center",
                            scrub: 1,
                            toggleActions: "play none none reverse",
                            markers: false,
                            onEnter: () => {
                                ScrollTrigger.refresh();
                            }
                        }
                    }
                );
            });

        }, sectionRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <div className={styles.exclusivebrandsmain} ref={sectionRef}>
                <div className="container">
                    <div className={styles.exclusivebrands}>
                        <div className={styles.exclusivebrandstitle} ref={titleRef}>
                            <h3>
                                <p>
                                <span ref={(el) => (spansRef.current[0] = el)}>{t('exclusiveBrands.title.line1')}</span>
                                </p>
                                <p>
                                <span ref={(el) => (spansRef.current[1] = el)}>{t('exclusiveBrands.title.line2')}</span>
                                </p>
                                <p>
                                <span ref={(el) => (spansRef.current[2] = el)}>{t('exclusiveBrands.title.line3')}</span>
                                </p>
                            </h3>
                        </div>
                        <div className={styles.exclusivebrandcardsmainflx}>
                            <div className={styles.exclusivebrandcardsmain} ref={(el) => (cardsRef.current[0] = el)}>
                                <div className={styles.exclusivebrandcard}>
                                    <Meridiani />
                                </div>
                                <div className={styles.exclusivebrandcard}>
                                    <Frigerio />
                                </div>
                            </div>
                            <div className={styles.exclusivebrandcardsmain} ref={(el) => (cardsRef.current[1] = el)}>
                                <div className={styles.exclusivebrandcard}>
                                    <Fiam />
                                </div>
                                <div className={styles.exclusivebrandcard}>
                                    <Sangiacomo />
                                </div>
                            </div>
                            <div className={styles.exclusivebrandcardsmain} ref={(el) => (cardsRef.current[2] = el)}>
                                <div className={styles.exclusivebrandcard}>
                                    <Modulnova />
                                </div>
                                <div className={styles.exclusivebrandcard}>
                                    <Sachi />
                                </div>
                            </div>
                            <div className={styles.exclusivebrandcardsmain} ref={(el) => (cardsRef.current[3] = el)}>
                                <div className={styles.exclusivebrandcard}>
                                    <Hansgrohe />
                                </div>
                                <div className={styles.exclusivebrandcard}>
                                    <Devidegroopi />
                                </div>
                            </div>
                            <div className={styles.exclusivebrandcardsmain} ref={(el) => (cardsRef.current[4] = el)}>
                                <div className={styles.exclusivebrandcard}>
                                    <Laminam />
                                </div>
                                <div className={styles.exclusivebrandcard}>
                                    <Dekton />
                                </div>
                            </div>
                        </div>
                        <Commonbutton Buttonlink="/" Buttontext={t('exclusiveBrands.button')} ButtonIcon={<Arrowicon />} />
                    </div> 
                </div> 
            </div> 
        </>
    )
}
