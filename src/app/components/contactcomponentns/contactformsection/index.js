"use client";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./contactformsection.module.scss"
import Image from "next/image";
import contactimage from "@/assets/images/contactimage.webp"

export default function Contactformsection() {
    const sectionRef = useRef(null);
    const spansRef = useRef([]);

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
                    stagger: {
                        amount: 1,
                        from: "start"
                    },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                        toggleActions: "play none none reverse",
                        markers: false
                    }
                }
            );

            const imageEffects = [
                styles.contactformleftimagelayer
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
                styles.contactformleftimage
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

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
  return (
    <>
      <div className={styles.contactformsectionmain} ref={sectionRef}>
        <div className="container">
            <div className={styles.contactformsectiontitle}>
                <h1>
                    <p>
                        <span ref={(el) => (spansRef.current[0] = el)}>contact</span>
                    </p>
                </h1>
            </div>
            <div className={styles.contactformsectionbody}>
                <div className={styles.contactformsectionbodyleftmain}>
                    <div className={styles.contactformleftimagelayer}></div>
                    <Image src={contactimage} alt="contactimage" className={styles.contactformleftimage}/>
                </div>
                <div className={styles.contactformsectionbodyrightmain}>
                    <form>
                        <div className={styles.forminputsmain}>
                            <label htmlFor="input-name">
                                <span ref={(el) => (spansRef.current[1] = el)}>full name:</span>
                            </label>
                            <input type="text" id="input-name" />
                        </div>
                        <div className={styles.forminputsmain}>
                            <label htmlFor="input-email">
                                <span ref={(el) => (spansRef.current[2] = el)}>email address:</span>
                            </label>
                            <input type="email" id="input-email" />
                        </div>
                        <div className={styles.forminputsmain}>
                            <label htmlFor="input-number">
                                <span ref={(el) => (spansRef.current[3] = el)}>Phone number:</span>
                            </label>
                            <input type="tel" id="input-number" />
                        </div>
                        <div className={styles.forminputsmain}>
                            <label htmlFor="input-option" >
                                <span ref={(el) => (spansRef.current[4] = el)}>i'm interested in</span>
                            </label>
                            <select id="input-option" >
                                <option value="business collaboration">business collaboration</option>
                                <option value="buying products">buying products</option>
                            </select>
                        </div>
                        <button type="submit" className={styles.submitbutton}>send</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
