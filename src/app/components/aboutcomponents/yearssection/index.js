"use client";
import React, { useLayoutEffect, useRef } from 'react'
import styles from "./yearssection.module.scss"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";
import yearsliderimage1 from "@/assets/images/yearsliderimage1.webp"
import yearsliderimage2 from "@/assets/images/yearsliderimage2.webp"
import yearsliderimage3 from "@/assets/images/yearsliderimage3.webp"
import yearsliderimage4 from "@/assets/images/yearsliderimage4.webp"
import yearsliderimage5 from "@/assets/images/yearsliderimage5.webp"
import yearsliderimage6 from "@/assets/images/yearsliderimage6.webp"

export default function Yearssection() {
    const spansRef = useRef([]);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            const spans = spansRef.current.filter(Boolean);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
            tl.fromTo(
                spans,
                {
                    y: 100,
                    opacity: 0,
                    rotation: 10,
                    transformOrigin: "left bottom"
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 1.5,
                    stagger: 0.3,
                    ease: "power2.out",
                    clearProps: "all"
                }
            );

            const slider = document.querySelector(`.${styles.yearsectionsliderflx}`);
            const sliderWidth = slider.scrollWidth - window.innerWidth;
            
            gsap.to(slider, {
                x: -(sliderWidth + 250),
                ease: "none",
                scrollTrigger: {
                    trigger: `.${styles.yearsectionslider}`,
                    start: "top 30%",
                    end: () => `+=${sliderWidth + 250}`,
                    scrub: .5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    markers: false,
                }
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);
  return (
    <div className={styles.yearssectionmain} ref={sectionRef}>
        <div className="container">
            <div className={styles.yearssection}>
                <h3>
                    <p>
                        <span ref={(el) => (spansRef.current[0] = el)}>30+</span>
                        <span ref={(el) => (spansRef.current[1] = el)}>years</span>
                    </p>
                </h3>
                <p className={styles.yearssectionparagraph}>
                    <span>
                        <span ref={(el) => (spansRef.current[2] = el)}>of bringing high-end interior</span>
                    </span>
                    <span>
                        <span ref={(el) => (spansRef.current[3] = el)}>products to your home.</span>
                    </span>
                </p>
            </div>
            <div className={styles.yearsectionslidermain}>
                <div className={styles.yearsectionslider}>
                    <div className={styles.yearsectionsliderflx}>
                        <div className={styles.yearsectionsliderimage}>
                            <Image src={yearsliderimage1} alt="yearsliderimage1" />
                        </div>
                        <div className={styles.yearsectionsliderimage}>
                            <Image src={yearsliderimage2} alt="yearsliderimage2" />
                        </div>
                        <div className={styles.yearsectionsliderimage}>
                            <Image src={yearsliderimage3} alt="yearsliderimage3" />
                        </div>
                        <div className={styles.yearsectionsliderimage}>
                            <Image src={yearsliderimage4} alt="yearsliderimage4" />
                        </div>
                        <div className={styles.yearsectionsliderimage}>
                            <Image src={yearsliderimage5} alt="yearsliderimage5" />
                        </div>
                        <div className={styles.yearsectionsliderimage}>
                            <Image src={yearsliderimage6} alt="yearsliderimage6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
