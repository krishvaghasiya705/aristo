"use client"
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./branddetailspage.module.scss"
import { Branddata } from "../branddatajs/branddata"
import Image from "next/image"
import Downloadicon from '@/assets/icon/downloadicon'
import Commonbutton from '../../commonbutton/button'

export default function Branddetailspage({ params }) {
    const sectionRef = useRef(null);
    const spansRef = useRef([]);
    const imagesRef = useRef([]);
    if (!params || !params.detailespage) {
        return <div>Invalid brand parameters</div>
    }

    const brandTitle = params.detailespage.toLowerCase()
    const brand = Branddata.find(b => b.details.Title.toLowerCase() === brandTitle)

    if (!brand) {
        return <div>Brand not found</div>
    }

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const spans = spansRef.current.filter(Boolean);
            const images = imagesRef.current.filter(Boolean);
    
            // Title animation with initial state
            gsap.set(spans[0], { y: 100, opacity: 0 });
            gsap.to(spans[0], {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: spans[0],
                    start: "top 90%",
                    end: "top 50%",
                    scrub: 1,
                    markers: false,
                    toggleActions: "play none none reverse"
                },
            });
    
            // About section animations
            spans.slice(1).forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: 1,
                            markers: false,
                        },
                    }
                );
            });
    
            // Image animations
            images.forEach((image, index) => {
                gsap.fromTo(
                    image,
                    { height: "0%", },
                    {
                        height: "100%",
                        duration: 1,
                        scrollTrigger: {
                            trigger: image,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: 1,
                            markers: false,
                        },
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
        <div className={styles.branddetailspagemain} ref={sectionRef}>
            <div className="container">
                <div className={styles.branddetailspagetitle}>
                    <h1>
                        <p ref={(el) => (spansRef.current[0] = el)}>{brand.details.Title}</p>
                    </h1>
                    <a
                        href={brand.details.BrandExplorelink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Commonbutton
                            Buttonlink="no"
                            Buttontext="download pdf catalog"
                            ButtonIcon={<Downloadicon />}
                        />
                    </a>
                </div>
                <div className={styles.brandbannerimage}>
                    <Image src={brand.details.Bannerimage} alt="brand.details.Bannerimage" />
                </div>
                <div className={styles.branddetailsmain}>
                    <span className={styles.branddetailspan} ref={(el) => (spansRef.current[1] = el)}>about the brand</span>
                    <div className={styles.brandlogo} ref={(el) => (spansRef.current[2] = el)}>
                        {brand.details.Brandlogo}
                    </div>
                    <div className={styles.brandparagraph}>
                        <p ref={(el) => (spansRef.current[3] = el)}>{brand.details.Branddescription}</p>
                    </div>

                    <div className={styles.brandexploremain}>
                        <a
                            href={brand.details.BrandExplorelink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.explorelink}
                        >
                            <span ref={(el) => (spansRef.current[4] = el)}>explore their website</span>
                            <span ref={(el) => (spansRef.current[5] = el)}>explore their website</span>
                        </a>
                    </div>
                </div>
                <div className={styles.brandimagesmainsection}>
                    <div className={styles.gridimage1main}>
                        <div className={styles.gridimage1} ref={(el) => (imagesRef.current[0] = el)}>
                            <Image
                                src={brand.details.BrandImages[0]}
                                alt={`${brand.details.Title} - Image 1`}
                            />
                        </div>
                    </div>
                    <div className={styles.gridimage2main}>
                        <div className={styles.gridimage2} ref={(el) => (imagesRef.current[1] = el)}>
                            <Image
                                src={brand.details.BrandImages[1]}
                                alt={`${brand.details.Title} - Image 2`}
                                
                            />
                        </div>
                    </div>
                    <div className={styles.gridimage3main}>
                        <div className={styles.gridimage3} ref={(el) => (imagesRef.current[2] = el)}>
                            <Image
                                src={brand.details.BrandImages[2]}
                                alt={`${brand.details.Title} - Image 3`}

                            />
                        </div>
                    </div>
                    <div className={styles.gridimage4main}>
                        <div className={styles.gridimage4} ref={(el) => (imagesRef.current[3] = el)}>
                            <Image
                                src={brand.details.BrandImages[3]}
                                alt={`${brand.details.Title} - Image 4`}
                                
                            />
                        </div>
                    </div>
                    <div className={styles.gridimage5main}>
                        <div className={styles.gridimage5} ref={(el) => (imagesRef.current[4] = el)}>
                            <Image
                                src={brand.details.BrandImages[4]}
                                alt={`${brand.details.Title} - Image 5`}
                                
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
