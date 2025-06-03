"use client";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ourpartners.module.scss";
import Marquee from "react-fast-marquee";
import Smeg from "@/assets/icon/smeg";
import Liebherr from "@/assets/icon/liebherr";
import Hansgrohe from "@/assets/icon/hansgrohe";
import Wolf from "@/assets/icon/wolf";
import Siemens from "@/assets/icon/siemens";
import Bang from "@/assets/icon/bang";
import Devidegroopi from "@/assets/icon/devidegroopi";
import Vzug from "@/assets/icon/vzug";
import Miele from "@/assets/icon/miele";
import Gaggenau from "@/assets/icon/gaggenau";
import Subzero from "@/assets/icon/subzero";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Ourpartners() {
    const sectionRef = useRef(null);
    const spansRef = useRef([]);
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
        }, sectionRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const ourpartnersmarqueedata = [
      {
        icon: <Smeg />,
      },
      {
        icon: <Liebherr />,
      },
      {
        icon: <Hansgrohe />,
      },
      {
        icon: <Wolf />,
      },
      {
        icon: <Siemens />,
      },
      {
        icon: <Bang />,
      },
      {
        icon: <Devidegroopi />,
      },
      {
        icon: <Vzug />,
      },
      {
        icon: <Miele />,
      },
      {
        icon: <Gaggenau />,
      },
      {
        icon: <Subzero />,
      }
    ]
  return (
    <>
      <div className={styles.ourpartnersmain} ref={sectionRef}>
        <div className="container">
          <div className={styles.ourpartnerstitle}>
            <h4>
              <p>
                <span ref={(el) => (spansRef.current[0] = el)}>{t('ourPartners.title.line1')}</span>
              </p>
              <p>
                <span ref={(el) => (spansRef.current[1] = el)}>{t('ourPartners.title.line2')}</span>
              </p>
            </h4>
          </div>
        </div>
          <Marquee direction="right" speed="150">
            <div className={styles.ourpartnersmarqueeflx}>
              {ourpartnersmarqueedata.map((i, index) => (
                <div className={styles.ourpartnersmarqueebox} key={index} data-cursor-hover>
                  {i.icon}
                </div>
              ))}
            </div>
          </Marquee>
      </div>
    </>
  );
}
