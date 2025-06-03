"use client";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./catalogsection.module.scss";
import Arrowicon from "@/assets/icon/arrowicon";
import Commonbutton from "../../commonbutton/button";

gsap.registerPlugin(ScrollTrigger);

export default function Catalogsection() {
  const sectionRef = useRef(null);
  const spansRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshScrollTrigger);
    const timeoutId = setTimeout(refreshScrollTrigger, 1000);

    return () => {
      window.removeEventListener("load", refreshScrollTrigger);
      clearTimeout(timeoutId);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const spans = spansRef.current.filter(Boolean);
      gsap.fromTo(
        spans,
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
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <>
      <div className={styles.catalogsectionmain} ref={sectionRef}>
        <div className="container">
          <div className={styles.catalogsection}>
            <h5>
              <p>
                <span ref={(el) => (spansRef.current[0] = el)}>catalog</span>
              </p>
            </h5>
            <Commonbutton Buttonlink="/" Buttontext="see all products" ButtonIcon={<Arrowicon />} />
          </div>
        </div>
      </div>
    </>
  );
}
